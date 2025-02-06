import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import supabase from "../../utils/supabase";
import { Stack } from "@mui/material";

function Login() {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgcolor="background.default"
    >
      <Auth
        supabaseClient={supabase}
        providers={["google", "github"]}
        socialLayout="horizontal"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: { inputText: "white" },
            },
          },
        }}
      />
    </Stack>
  );
}

export default Login;
