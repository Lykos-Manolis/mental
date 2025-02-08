import { useState, useEffect } from "react";
import { getConversationInfo } from "../api/conversations";

export function useGetConversationInfo(chatId) {
  const [conversationInfo, setConversationInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConversationInfo() {
      try {
        setIsLoading(true);
        const data = await getConversationInfo(chatId);
        setConversationInfo(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (chatId) {
      fetchConversationInfo();
    }
  }, [chatId]);

  return { conversationInfo, isLoading, error };
}
