import { useState, useEffect } from "react";

export const useOnlineStatus = (lastSignIn) => {
  const [isOnline, setIsOnline] = useState(false);

  const isOnlineToday = (lastSignIn) => {
    if (!lastSignIn) return false;
    const now = new Date();
    const signInDate = new Date(lastSignIn);
    const diffInMinutes = (now - signInDate) / (1000 * 60);
    return diffInMinutes <= 60;
  };

  useEffect(() => {
    setIsOnline(isOnlineToday(lastSignIn));
  }, [lastSignIn]);

  return isOnline;
};
