import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../auth/AuthContext";

function LogoutButton() {
  const { signOut } = useAuth();
  return (
    <Button variant="contained" color="error" onClick={signOut}>
      Logout
    </Button>
  );
}

export default LogoutButton;
