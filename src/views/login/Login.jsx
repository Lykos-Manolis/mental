import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import supabase from "../../utils/supabase";
import { Stack, Typography, useTheme } from "@mui/material";

function Login() {
  const { session } = useAuth();
  const theme = useTheme();

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
      sx={{
        backgroundImage: "url(/svg/login.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: theme.palette.text.primary,
          mb: 5,
          width: "100%",
          textAlign: "center",
          fontFamily: "Agbalumo",
        }}
      >
        Mental
      </Typography>
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
