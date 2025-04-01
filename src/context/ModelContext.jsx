import React, { createContext, useContext, useState } from "react";
import { EMOTION_LABELS } from "../constants/emotions";

// Create context
const ModelContext = createContext(null);

// Hugging Face API configuration
const HF_API_URL = "https://api-inference.huggingface.co/models/notLoup/mental";
const HF_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export function ModelProvider({ children }) {
  // We only need a loading state for API calls
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionError, setPredictionError] = useState(null);

  const predictEmotion = async (text) => {
    if (!text) {
      throw new Error("Text is required for prediction");
    }

    try {
      setPredictionLoading(true);
      setPredictionError(null); // Clear any previous errors

      // Call Hugging Face API
      const response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `API error: ${response.status}`;
        console.error(`Prediction API error: ${errorMessage}`);
        setPredictionError({
          type: "api_error",
          message: errorMessage,
          statusCode: response.status,
          details: errorData,
        });
        throw new Error(errorMessage);
      }

      // Parse response
      const result = await response.json();
      console.log("API result:", result);

      // Make sure we have valid response data
      if (
        !result ||
        !Array.isArray(result) ||
        !result[0] ||
        !result[0][0] ||
        !result[0][0].label
      ) {
        const errorMessage = "Unexpected response format from prediction API";
        console.error(errorMessage, result);
        setPredictionError({
          type: "format_error",
          message: errorMessage,
          details: result,
        });
        throw new Error(errorMessage);
      }

      const predictedEmotionIndex = Number(
        result[0][0].label.replace("LABEL_", ""),
      );

      if (
        isNaN(predictedEmotionIndex) ||
        predictedEmotionIndex < 0 ||
        predictedEmotionIndex >= EMOTION_LABELS.length
      ) {
        const errorMessage = `Invalid emotion index: ${result[0][0].label}`;
        console.error(errorMessage);
        setPredictionError({
          type: "parsing_error",
          message: errorMessage,
          details: result,
        });
        throw new Error(errorMessage);
      }

      const predictedEmotion = EMOTION_LABELS[predictedEmotionIndex];

      return { emotion: predictedEmotion };
    } catch (error) {
      // If we haven't already set a structured error, set a generic one
      if (!predictionError) {
        setPredictionError({
          type: "unknown_error",
          message:
            error.message || "An unknown error occurred during prediction",
          details: error,
        });
      }
      console.error("Error during prediction:", error);
      throw error;
    } finally {
      setPredictionLoading(false);
    }
  };

  const clearPredictionError = () => {
    setPredictionError(null);
  };

  return (
    <ModelContext.Provider
      value={{
        predictEmotion,
        isModelReady: true, // API is always ready
        predictionLoading,
        predictionError,
        clearPredictionError,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export const useModel = () => useContext(ModelContext);
