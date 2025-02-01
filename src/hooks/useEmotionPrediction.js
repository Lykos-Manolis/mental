import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const MAX_LENGTH = 100;
const EMOTION_LABELS = [
  "admiration",
  "amusement",
  "anger",
  "annoyance",
  "approval",
  "caring",
  "confusion",
  "curiosity",
  "desire",
  "disappointment",
  "disapproval",
  "disgust",
  "embarrassment",
  "excitement",
  "fear",
  "gratitude",
  "grief",
  "joy",
  "love",
  "nervousness",
  "optimism",
  "pride",
  "realization",
  "relief",
  "remorse",
  "sadness",
  "surprise",
  "neutral",
];

const EMOTION_COLORS = {
  admiration: "rgba(255, 215, 0, 0.5)",
  amusement: "rgba(255, 192, 203, 0.5)",
  anger: "rgba(255, 0, 0, 0.5)",
  annoyance: "rgba(255, 99, 71, 0.5)",
  approval: "rgba(50, 205, 50, 0.5)",
  caring: "rgba(255, 182, 193, 0.5)",
  confusion: "rgba(147, 112, 219, 0.5)",
  curiosity: "rgba(135, 206, 235, 0.5)",
  desire: "rgba(255, 20, 147, 0.5)",
  disappointment: "rgba(128, 128, 128, 0.5)",
  disapproval: "rgba(139, 0, 0, 0.5)",
  disgust: "rgba(0, 100, 0, 0.5)",
  embarrassment: "rgba(219, 112, 147, 0.5)",
  excitement: "rgba(255, 140, 0, 0.5)",
  fear: "rgba(25, 25, 112, 0.5)",
  gratitude: "rgba(218, 165, 32, 0.5)",
  grief: "rgba(0, 0, 0, 0.5)",
  joy: "rgba(255, 255, 0, 0.5)",
  love: "rgba(255, 0, 255, 0.5)",
  nervousness: "rgba(176, 196, 222, 0.5)",
  optimism: "rgba(255, 165, 0, 0.5)",
  pride: "rgba(148, 0, 211, 0.5)",
  realization: "rgba(64, 224, 208, 0.5)",
  relief: "rgba(152, 251, 152, 0.5)",
  remorse: "rgba(70, 130, 180, 0.5)",
  sadness: "rgba(0, 0, 139, 0.5)",
  surprise: "rgba(255, 105, 180, 0.5)",
  neutral: "rgba(169, 169, 169, 0.5)",
  default: "rgba(128, 128, 128, 0.5)",
};

export function useEmotionPrediction() {
  const [model, setModel] = useState(null);
  const [wordIndex, setWordIndex] = useState({});
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    }
    loadAssets();
  }, []);

  const predictEmotionAndGetColor = async (text) => {
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
    predictEmotionAndGetColor,
    loading,
    isModelReady: !!model,
  };
}
