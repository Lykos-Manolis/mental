import { Paper, Tooltip, Typography, Zoom, useTheme } from "@mui/material";
import React from "react";

function ChatMessage({ content, sent_by_user, emotion }) {
  const theme = useTheme();
  return (
    <Tooltip
      title={emotion}
      disableFocusListener
      slots={{
        transition: Zoom,
      }}
    >
      <Paper
        sx={{
          borderRadius: sent_by_user ? "20px 0 20px 20px" : "0 20px 20px 20px",
          maxWidth: "75%",
          width: "auto",
          px: 2,
          py: 1.2,
          bgcolor: sent_by_user
            ? theme.palette.bubble.user
            : theme.palette.bubble.partner,
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0)",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            lineHeight: 1.4,
            color: sent_by_user
              ? theme.palette.text.contrast
              : theme.palette.text.primary,
          }}
        >
          {content}
        </Typography>
      </Paper>
    </Tooltip>
  );
}

export default ChatMessage;
