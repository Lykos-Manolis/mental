import { Paper, Typography } from "@mui/material";
import React from "react";

function ChatMessage({ messageContent, sender, prevSender, filler }) {
  return filler ? (
    <Paper sx={{ my: 7 }} />
  ) : (
    <Paper
      elevation={6}
      sx={{
        borderRadius: 5,
        px: 2,
        py: 1,
        mt: 0.5,
        mb: prevSender && prevSender !== sender ? 1.5 : 0,
        mr: sender === "contact" ? 10 : 0,
        ml: sender === "user" ? 10 : 0,
        alignSelf: sender === "user" ? "flex-end" : "flex-start",
        bgcolor: sender === "user" ? "#147efb" : "black",
        boxShadow:
          sender === "user" ? "1px 1px 3px #147efb" : "1px 1px 3px #000000",
      }}
    >
      <Typography sx={{ textAlign: "start" }}>{messageContent}</Typography>
    </Paper>
  );
}

export default ChatMessage;
