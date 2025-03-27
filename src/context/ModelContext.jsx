import React, { createContext, useContext, useState, useEffect } from "react";
import { EMOTION_COLORS, EMOTION_LABELS } from "../constants/emotions";
import { processText } from "../utils/textProcessing";
import { MODEL_CONSTANTS } from "../constants/model";

const ModelContext = createContext(null);

export function ModelProvider({ children }) {
  const [model, setModel] = useState(null);
  const [wordIndex, setWordIndex] = useState({});
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      try {
        // Dynamically import TensorFlow.js
        const tf = await import("@tensorflow/tfjs");
        console.log("Loading emotion prediction model...");
        const loadedModel = await tf.loadGraphModel("/emo_model_js/model.json");
        setModel(loadedModel);

        const response = await fetch("/word_index.json");
        const wordIndexData = await response.json();
        setWordIndex(wordIndexData);
        console.log("Model and word index loaded successfully");
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
      // Dynamically import TensorFlow.js when needed
      const tf = await import("@tensorflow/tfjs");
      const processedSequence = processText(text, wordIndex);
      const inputTensor = tf.tensor2d(
        [processedSequence],
        [1, MODEL_CONSTANTS.MAX_LENGTH],
      );

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

  return (
    <ModelContext.Provider
      value={{
        predictEmotion,
        modelLoading,
        isModelReady: !!model,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export const useModel = () => useContext(ModelContext);
