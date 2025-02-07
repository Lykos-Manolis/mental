import { useState, useEffect } from "react";
import { getConversationMessages } from "../api/messages";

export function useGetConversationMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        setIsLoading(true);
        const data = await getConversationMessages(conversationId);
        setMessages(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  return { messages, isLoading, error };
}
