import { useState } from "react";
import { updateFavoriteContacts } from "../api/contacts";

export function useSetFavoriteContacts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setFavoriteContacts = async (contacts) => {
    try {
      setIsLoading(true);
      setError(null);
      await updateFavoriteContacts(contacts.map((contact) => contact.id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { setFavoriteContacts, isLoading, error };
}
