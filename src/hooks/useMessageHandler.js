import { useState } from "react";
import { useSendMessage } from "./useSendMessage";
import { useEmotionPrediction } from "./useEmotionPrediction";

export function useMessageHandler(chatId, onColorUpdate) {
  const [text, setText] = useState("");

  const { sendMessage } = useSendMessage();
  const { predictEmotion, modelLoading, isModelReady } = useEmotionPrediction();

  const handleEnter = async () => {
    try {
      const { emotion, color } = await predictEmotion(text);
      console.log(`Predicted: ${emotion}\n---\nInput: ${text}`);
      await sendMessage(text, emotion, chatId);
      onColorUpdate(color);
      setText("");
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  const handleKeyDown = async (pressedKey) => {
    if (pressedKey === "Enter" && !modelLoading && isModelReady && text) {
      await handleEnter();
    }
  };

  return {
    text,
    setText,
    handleEnter,
    handleKeyDown,
    modelLoading,
    isModelReady,
  };
}
