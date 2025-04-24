import { useState, useEffect, useCallback } from "react";
import { getConversationMessages } from "../api/messages";
import supabase from "../utils/supabase";
import { decryptMessages } from "../utils/encryption";

export function useGetConversationMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, setOptimisticMessages] = useState([]);
  const [decryptedMessages, setDecryptedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to add an optimistic message
  const addOptimisticMessage = useCallback((message) => {
    setOptimisticMessages((prev) => [...prev, message]);
  }, []);

  // Combine real messages with optimistic ones
  useEffect(() => {
    if (messages && messages.length > 0) {
      (async () => {
        const decryptedMessages = await decryptMessages(
          messages,
          conversationId,
        );

        // Filter out optimistic messages that have matching real messages
        // A message is considered matching if the content is the same and it was sent recently
        const filteredOptimisticMessages = optimisticMessages.filter(
          (optimistic) => {
            // Consider a message a match if it has the same content and was sent within the last minute
            const matchingMessage = decryptedMessages.find(
              (real) =>
                real.content === optimistic.content &&
                real.sender_id === optimistic.sender_id &&
                new Date(real.created_at) > new Date(Date.now() - 60000),
            );
            return !matchingMessage;
          },
        );

        // Combine real messages with remaining optimistic ones
        setDecryptedMessages([
          ...decryptedMessages,
          ...filteredOptimisticMessages,
        ]);

        // Update optimistic messages state to remove matched ones
        if (filteredOptimisticMessages.length !== optimisticMessages.length) {
          setOptimisticMessages(filteredOptimisticMessages);
        }
      })();
    } else {
      // If no real messages, just show optimistic ones
      setDecryptedMessages([...optimisticMessages]);
    }
  }, [messages, optimisticMessages, conversationId]);

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

  return { decryptedMessages, isLoading, error, addOptimisticMessage };
}
