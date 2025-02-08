import { Paper, Typography } from "@mui/material";
import React from "react";

function ChatMessage({ content, sent_by_user, extraSpace }) {
  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: 5,
        px: 2,
        py: 1,
        mt: 0.5,
        mb: extraSpace ? 2 : 0.1,
        mr: !sent_by_user ? 21 : 1,
        ml: sent_by_user ? 21 : 1,
        alignSelf: sent_by_user ? "flex-end" : "flex-start",
        bgcolor: sent_by_user ? "#147efb" : "black",
        boxShadow: sent_by_user ? "1px 1px 3px #147efb" : "1px 1px 3px #000000",
      }}
    >
      <Typography sx={{ textAlign: "start" }}>{content}</Typography>
    </Paper>
  );
}

export default ChatMessage;
