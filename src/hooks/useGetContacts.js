import { useState, useEffect } from "react";
import { getBasicContacts, getContactsLastMessages } from "../api/contacts";
import supabase from "../utils/supabase";

export function useGetContacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortContactsByLastMessage = (contacts) => {
    return [...contacts].sort((a, b) => {
      // If no last message, put at the bottom
      if (!a.last_message) return 1;
      if (!b.last_message) return -1;

      // Sort by created_at in descending order (newest first)
      return (
        new Date(b.last_message.created_at) -
        new Date(a.last_message.created_at)
      );
    });
  };

  useEffect(() => {
    async function fetchAndMergeData() {
      try {
        const [basicContacts, lastMessages] = await Promise.all([
          getBasicContacts(),
          getContactsLastMessages(),
        ]);

        // Merge and sort the data
        const mergedContacts = sortContactsByLastMessage(
          basicContacts.map((contact) => ({
            ...contact,
            ...lastMessages.find(
              (msg) => msg.contact_id === contact.contact_id,
            ),
          })),
        );

        setContacts(mergedContacts);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndMergeData();

    // Subscribe to contacts changes
    const contactsSubscription = supabase
      .channel("public:contacts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contacts",
          filter: `user_id=eq.${supabase.auth.getUser().id}`,
        },
        async () => {
          const basicContacts = await getBasicContacts();
          setContacts((current) =>
            sortContactsByLastMessage(
              basicContacts.map((contact) => ({
                ...contact,
                ...current.find((c) => c.contact_id === contact.contact_id),
              })),
            ),
          );
        },
      )
      .subscribe();

    // Subscribe to messages changes
    const messagesSubscription = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async () => {
          const lastMessages = await getContactsLastMessages();
          setContacts((current) =>
            sortContactsByLastMessage(
              current.map((contact) => ({
                ...contact,
                ...lastMessages.find(
                  (msg) => msg.contact_id === contact.contact_id,
                ),
              })),
            ),
          );
        },
      )
      .subscribe();

    // Subscribe to conversations changes (for read status)
    const conversationsSubscription = supabase
      .channel("public:conversations")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
          filter: `last_message_at.neq.NULL`,
        },
        async () => {
          const lastMessages = await getContactsLastMessages();
          setContacts((current) =>
            sortContactsByLastMessage(
              current.map((contact) => ({
                ...contact,
                ...lastMessages.find(
                  (msg) => msg.contact_id === contact.contact_id,
                ),
              })),
            ),
          );
        },
      )
      .subscribe();

    return () => {
      contactsSubscription.unsubscribe();
      messagesSubscription.unsubscribe();
      conversationsSubscription.unsubscribe();
    };
  }, []);

  return { contacts, isLoading, error };
}
