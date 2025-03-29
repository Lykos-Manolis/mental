import { useState, useEffect } from "react";
import { getEmotionAnalytics } from "../api/analytics";

export function useGetEmotionAnalytics() {
  const [emotionAnalytics, setEmotionAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmotionAnalytics() {
      try {
        setIsLoading(true);
        const data = await getEmotionAnalytics();
        setEmotionAnalytics(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmotionAnalytics();
  }, []);

  return { emotionAnalytics, isLoading, error };
}
