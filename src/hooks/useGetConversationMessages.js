import { useState, useEffect } from "react";
import { getConversationMessages } from "../api/messages";
import supabase from "../utils/supabase";

export function useGetConversationMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(messages);

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

      // Subscribe to new messages
      const subscription = supabase
        .channel(`messages:conversation_id=eq.${conversationId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            setMessages((currentMessages) => [...currentMessages, payload.new]);
          },
        )
        .subscribe();

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [conversationId]);

  return { messages, isLoading, error };
}
