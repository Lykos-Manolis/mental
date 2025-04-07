import { useState } from "react";
import { useSendMessage } from "./useSendMessage";
import { useGetEmotionPrediction } from "./useGetEmotionPrediction";
import { useTheme } from "@mui/material";
import { encryptMessage } from "../utils/encryption";
import { getMasterKey } from "../utils/indexedDB";

export function useMessageHandler(chatId, onColorUpdate, userId) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const {
    fetchPrediction,
    error: predictionError,
    setError: setPredictionError,
  } = useGetEmotionPrediction();
  const {
    sendMessage,
    error: sendError,
    setError: setSendError,
  } = useSendMessage();

  const handleSend = async () => {
    if (!text.replace(/\s/g, "")) return;

    // Clear any previous errors
    setError(null);

    const messageCopy = text;
    setText("");

    try {
      const prediction = await fetchPrediction(messageCopy);

      if (onColorUpdate && prediction) {
        onColorUpdate(prediction);
      }

      const masterKey = await getMasterKey(chatId);

      const { encryptedMessage, iv } = await encryptMessage(
        messageCopy,
        masterKey,
      );
      await sendMessage(encryptedMessage, iv, prediction ?? "neutral", chatId);

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
    // Also clear errors from other hooks
    if (setPredictionError) setPredictionError(null);
    if (setSendError) setSendError(null);
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
