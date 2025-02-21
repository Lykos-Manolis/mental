import React from "react";
import { IconButton } from "@mui/material";
import { useAuth } from "../../auth/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

function LogoutButton() {
  const { signOut } = useAuth();
  return (
    <IconButton aria-label="logout" color="error" onClick={signOut}>
      <LogoutIcon />
    </IconButton>
  );
}

export default LogoutButton;
