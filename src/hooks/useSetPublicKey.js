import { useState } from "react";
import { setPublicKey } from "../api/keys";

export function useSetPublicKey() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSetPublicKey = async (publicKey) => {
    try {
      setIsLoading(true);
      setError(null);
      await setPublicKey(publicKey);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { setPublicKey: handleSetPublicKey, isLoading, error };
}
