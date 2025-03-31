import { useState } from "react";
import { useSendMessage } from "./useSendMessage";
import { useEmotionPrediction } from "./useEmotionPrediction";

export function useMessageHandler(chatId, onColorUpdate) {
  const [text, setText] = useState("");
  const [optimisticMessages, setOptimisticMessages] = useState([]);

  const { sendMessage } = useSendMessage();
  const { predictEmotion, modelLoading, isModelReady } = useEmotionPrediction();

  const handleEnter = async () => {
    if (!text.trim()) return;

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
      const { emotion, color } = await predictEmotion(messageCopy);
      console.log(`Predicted: ${emotion}\n---\nInput: ${messageCopy}`);
      await sendMessage(messageCopy, emotion, chatId);
      onColorUpdate(color);

      // Remove optimistic message after the real one is saved
      // (it will appear through the Supabase subscription)
      setOptimisticMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    } catch (error) {
      console.error("Prediction failed:", error);
      // Could show an error state for the optimistic message here
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
    optimisticMessages,
  };
}
