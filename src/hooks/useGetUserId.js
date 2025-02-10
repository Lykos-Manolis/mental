import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export function useGetUserId() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getUserId();
  }, []);

  return userId;
}
