import { useState, useEffect } from "react";
import { getEmotionPrediction } from "../api/emotions";
import { EMOTION_LABELS } from "../constants/emotions";

export function useGetEmotionPrediction() {
  const [prediction, setPrediction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrediction = async (text) => {
    if (!text) return null;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await getEmotionPrediction(text);

      if (error) {
        throw new Error(error.message);
      }

      const predictedEmotionIndex = Number(
        data[0][0].label.replace("LABEL_", ""),
      );

      console.log("predictedEmotionIndex", predictedEmotionIndex);

      if (
        isNaN(predictedEmotionIndex) ||
        predictedEmotionIndex < 0 ||
        predictedEmotionIndex >= EMOTION_LABELS.length
      ) {
        throw new Error("Invalid emotion index");
      }

      const predictedEmotion = EMOTION_LABELS[predictedEmotionIndex];
      console.log("predictedEmotion", predictedEmotion);

      setPrediction(predictedEmotion);
      return predictedEmotion; // Return the emotion for immediate use
    } catch (err) {
      console.error("Emotion prediction failed:", err.message);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchPrediction,
    prediction,
    isLoading,
    error,
    setError,
  };
}
