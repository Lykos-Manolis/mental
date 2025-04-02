import { useState } from "react";
import { useSendMessage } from "./useSendMessage";
import { useGetEmotionPrediction } from "./useGetEmotionPrediction";
import { useTheme } from "@mui/material";

export function useMessageHandler(chatId, onColorUpdate, userId) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const theme = useTheme();

  // Get the hooks for emotion prediction and message sending
  const { fetchPrediction, error: predictionError } = useGetEmotionPrediction();
  const { sendMessage, error: sendError } = useSendMessage();

  const handleSend = async () => {
    if (!text.trim()) return;

    // Clear any previous errors
    setError(null);

    const messageCopy = text;
    setText("");

    try {
      // Step 1: Get emotion prediction
      const prediction = await fetchPrediction(messageCopy);

      // Step 2: Update background color based on emotion
      if (onColorUpdate && prediction) {
        onColorUpdate(prediction);
      }

      // Step 3: Send message with the predicted emotion
      await sendMessage(messageCopy, prediction ?? "neutral", chatId);

      return prediction;
    } catch (error) {
      console.error("Message handling failed:", error.message);
      setError(error.message);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && !event.shiftKey && text) {
      await handleSend();
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return {
    text,
    setText,
    handleSend,
    handleKeyDown,
    error: error || predictionError || sendError,
    dismissError,
  };
}
