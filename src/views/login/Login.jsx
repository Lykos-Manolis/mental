import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import supabase from "../../utils/supabase";
import { Stack, Typography } from "@mui/material";

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
          color: "white",
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
        localization={{
          variables: {
            sign_in: {
              email_input_placeholder: "",
              password_input_placeholder: "",
            },
            sign_up: {
              email_input_placeholder: "",
              password_input_placeholder: "",
            },
          },
        }}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: { background: "white", color: "black" },
            anchor: { color: "white" },
            input: { border: "2px solid white", color: "white" },
            divider: { border: "2px solid white", borderRadius: "10px" },
            label: { color: "white" },
            message: { color: "white", background: "#2f2f2f" },
          },
        }}
      />
    </Stack>
  );
}

export default Login;
