import { Avatar, Grid2, IconButton, Typography } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

function ChatHeader({ contactName, contactAvatar, toggleDrawer }) {
  return (
    <Grid2
      container
      direction="row"
      wrap="nowrap"
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        backdropFilter: "blur(2px)",
        zIndex: 2,
        px: 4,
        py: 1,
      }}
    >
      <IconButton sx={{ m: 0, p: 0 }}>
        <Avatar
          alt={contactName}
          src={contactAvatar}
          sx={{ border: "3px solid lime" }}
        />
      </IconButton>
      <Typography
        variant="h5"
        sx={{
          m: 0,
          p: 0,
          fontWeight: "bold",
        }}
      >
        {contactName}
      </Typography>
      <IconButton sx={{ m: 0, p: 0.5 }} onClick={toggleDrawer}>
        <SettingsIcon sx={{ color: "text.secondary" }} />
      </IconButton>
    </Grid2>
  );
}

export default ChatHeader;
