import { Avatar, Grid2, IconButton, Skeleton, Typography } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

function ChatHeader({ conversationInfo, toggleDrawer, isLoading }) {
  return (
    <Grid2
      container
      direction="row"
      wrap="nowrap"
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        px: 5,
        py: 1,
      }}
    >
      {isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <IconButton>
          <Avatar
            alt={conversationInfo.full_name}
            src={conversationInfo.avatar_url}
            sx={{ border: "3px solid lime" }}
          />
        </IconButton>
      )}
      {isLoading ? (
        <Skeleton variant="text" height={40} width={100} sx={{ mx: 4 }} />
      ) : (
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {conversationInfo.full_name}
        </Typography>
      )}

      {isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <IconButton sx={{ p: 0.5 }} onClick={toggleDrawer}>
          <SettingsIcon sx={{ color: "text.secondary" }} />
        </IconButton>
      )}
    </Grid2>
  );
}

export default ChatHeader;
