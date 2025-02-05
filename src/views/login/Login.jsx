import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import supabase from "../../utils/supabase";

function Login() {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/home" replace />;
  }

  return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
}

export default Login;
