import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { initializeIndexedDB } from "../utils/indexedDB";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        if (session) {
          try {
            // Initialize IndexedDB with the user's ID
            await initializeIndexedDB(session.user.id);
            setDbInitialized(true);
          } catch (error) {
            console.error("Error initializing IndexedDB:", error);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
        setIsLoading(false);
      }
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session) {
        try {
          // Re-initialize IndexedDB when auth state changes
          await initializeIndexedDB(session.user.id);
          setDbInitialized(true);
        } catch (error) {
          console.error("Error initializing IndexedDB on auth change:", error);
        }
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setDbInitialized(false);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, isLoading, dbInitialized, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
