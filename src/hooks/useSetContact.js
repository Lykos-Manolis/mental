import { useState } from "react";
import { setContact as setContactApi } from "../api/contacts";

export function useSetContact() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSetContact = async (contact) => {
    try {
      setIsLoading(true);
      setError(null);
      await setContactApi(contact);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { setContact: handleSetContact, isLoading, error };
}
