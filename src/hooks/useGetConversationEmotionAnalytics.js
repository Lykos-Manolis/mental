import { useState, useEffect } from "react";
import { getConversationEmotionAnalytics } from "../api/analytics";

export function useGetConversationEmotionAnalytics(conversationId) {
  const [emotionAnalytics, setEmotionAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmotionAnalytics() {
      if (!conversationId) return;

      try {
        setIsLoading(true);
        const data = await getConversationEmotionAnalytics(conversationId);
        setEmotionAnalytics(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmotionAnalytics();
  }, [conversationId]);

  return { emotionAnalytics, isLoading, error };
}
