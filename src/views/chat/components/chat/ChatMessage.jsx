import { Paper, Typography } from "@mui/material";
import React from "react";

function ChatMessage({ content, sent_by_user, extraSpace }) {
  return (
    <Paper
      sx={{
        borderRadius: sent_by_user ? "20px 0 20px 20px" : "0 20px 20px 20px",
        px: 2,
        py: 1,
        mt: 0.5,
        mb: extraSpace ? 2 : 0.1,
        mr: !sent_by_user ? 21 : 1,
        ml: sent_by_user ? 21 : 1,
        alignSelf: sent_by_user ? "flex-end" : "flex-start",
        bgcolor: sent_by_user ? "rgba(250,250,240,1)" : "rgba(250,250,240,0.6)",
        color: "black",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0)",
      }}
    >
      <Typography sx={{ textAlign: "start" }}>{content}</Typography>
    </Paper>
  );
}

export default ChatMessage;
