import { Paper, Typography } from "@mui/material";
import React from "react";

function ChatMessage({ content, sent_by_user }) {
  return (
    <Paper
      sx={{
        borderRadius: sent_by_user ? "20px 0 20px 20px" : "0 20px 20px 20px",
        maxWidth: "75%",
        width: "auto",
        px: 2,
        py: 1,
        bgcolor: sent_by_user ? "rgba(250,250,240,1)" : "rgba(250,250,240,0.6)",
        color: "black",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0)",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          letterSpacing: "0.04em",
          whiteSpace: "pre-wrap",
          fontSize: "0.9rem",
          lineHeight: 1.4,
          color: "rgba(0, 0, 0, 0.8)",
        }}
      >
        {content}
      </Typography>
    </Paper>
  );
}

export default ChatMessage;
