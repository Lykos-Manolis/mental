import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { EMOTION_COLORS, EMOTION_LABELS } from "../constants";

const MAX_LENGTH = 100;

export function useEmotionPrediction() {
  const [model, setModel] = useState(null);
  const [wordIndex, setWordIndex] = useState({});
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      try {
        const loadedModel = await tf.loadLayersModel(
          "/emo_model_js/model.json",
        );
        setModel(loadedModel);

        const response = await fetch("/word_index.json");
        const wordIndexData = await response.json();
        setWordIndex(wordIndexData);
      } catch (error) {
        console.error("Error loading model or word index:", error);
      } finally {
        setModelLoading(false);
      }
    }
    loadAssets();
  }, []);

  const predictEmotion = async (text) => {
    if (!model) {
      throw new Error("Model is still loading...");
    }

    try {
      const sequence = padSequence(textToSequences(text));
      const inputTensor = tf.tensor2d([sequence], [1, MAX_LENGTH]);

      const predictionTensor = model.predict(inputTensor);
      const predictionArray = await predictionTensor.array();
      const predictedClassIndex = predictionArray[0].indexOf(
        Math.max(...predictionArray[0]),
      );

      const predictedEmotion = EMOTION_LABELS[predictedClassIndex];
      const newColor = EMOTION_COLORS[predictedEmotion];

      // Cleanup tensors
      inputTensor.dispose();
      predictionTensor.dispose();

      return { emotion: predictedEmotion, color: newColor };
    } catch (error) {
      console.error("Error during prediction:", error);
      throw error;
    }
  };

  // Helper functions
  const textToSequences = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => wordIndex[word] || 0);
  };

  const padSequence = (sequence) => {
    while (sequence.length < MAX_LENGTH) sequence.push(0);
    return sequence.slice(0, MAX_LENGTH);
  };

  return {
    predictEmotion,
    modelLoading,
    isModelReady: !!model,
  };
}
