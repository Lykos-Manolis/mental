import { useState, useEffect } from "react";
import { getUserContacts } from "../api/contacts";

export function useGetContacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const data = await getUserContacts();
        setContacts(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContacts();
  }, []);

  return { contacts, isLoading, error };
}
