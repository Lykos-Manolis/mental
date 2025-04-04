import { useState, useEffect } from "react";
import { getBasicContacts, getContactsLastMessages } from "../api/contacts";
import supabase from "../utils/supabase";

export function useGetContacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortContactsByLastMessage = (contacts) => {
    return [...contacts].sort((a, b) => {
      if (!a.last_message) return 1;
      if (!b.last_message) return -1;

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
