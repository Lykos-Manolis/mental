import { useState } from "react";
import { useSendMessage } from "./useSendMessage";
import { useEmotionPrediction } from "./useEmotionPrediction";
import { useTheme } from "@mui/material";

export function useMessageHandler(chatId, onColorUpdate) {
  const [text, setText] = useState("");
  const [optimisticMessages, setOptimisticMessages] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const { sendMessage } = useSendMessage();
  const {
    predictEmotion,
    modelLoading,
    isModelReady,
    predictionError,
    clearPredictionError,
  } = useEmotionPrediction();

  const handleEnter = async () => {
    if (!text.trim()) return;

    // Clear any previous errors
    setError(null);

    // Create a temporary message ID for optimistic updates
    const tempId = `temp-${Date.now()}`;

    // Add optimistic message to local state
    const optimisticMessage = {
      id: tempId,
      content: text,
      emotion: "neutral", // Default emotion until prediction completes
      conversation_id: chatId,
      sender_id: "currentUser", // You'll need to replace this with actual user ID
      created_at: new Date().toISOString(),
      is_optimistic: true,
    };

    setOptimisticMessages((prev) => [...prev, optimisticMessage]);

    // Clear input immediately for better UX
    const messageCopy = text;
    setText("");

    try {
      // Process in background
      const { emotion } = await predictEmotion(messageCopy);
      console.log(`Predicted: ${emotion}\n---\nInput: ${messageCopy}`);
      await sendMessage(messageCopy, emotion, chatId);

      // Get color from theme
      const color =
        theme.palette.emotion[emotion] || theme.palette.background.default;
      onColorUpdate(color);

      // Remove optimistic message after the real one is saved
      // (it will appear through the Supabase subscription)
      setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    } catch (error) {
      console.error("Prediction failed:", error);

      // Create user-friendly error message
      let errorMessage = "Failed to predict emotion. Please try again.";

      if (predictionError) {
        // Use the structured error from the model context
        switch (predictionError.type) {
          case "api_error":
            errorMessage = `API Error: ${predictionError.message}`;
            if (predictionError.statusCode === 401) {
              errorMessage = "Authentication failed. Please check API key.";
            }
            break;
          case "format_error":
            errorMessage = "Could not understand the model response.";
            break;
          case "parsing_error":
            errorMessage = "Error processing the emotion prediction.";
            break;
          default:
            errorMessage = predictionError.message || errorMessage;
        }
      }

      setError({
        message: errorMessage,
        details: error.message,
        timestamp: new Date().toISOString(),
      });

      // Keep the message in optimistic state but mark as error
      setOptimisticMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? { ...msg, hasError: true, emotion: "neutral" }
            : msg,
        ),
      );
    }
  };

  const handleKeyDown = async (pressedKey) => {
    if (pressedKey === "Enter" && !modelLoading && isModelReady && text) {
      await handleEnter();
    }
  };

  const dismissError = () => {
    setError(null);
    if (clearPredictionError) {
      clearPredictionError();
    }
  };

  return {
    text,
    setText,
    handleEnter,
    handleKeyDown,
    modelLoading,
    isModelReady,
    optimisticMessages,
    error,
    dismissError,
  };
}
