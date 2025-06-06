import { useState } from "react";
import { setMessage } from "../api/messages";

export function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message, iv, emotion, conversationId) => {
    try {
      setIsLoading(true);
      setError(null);
      await setMessage(message, iv, emotion, conversationId);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error, setError };
}
