import { Grid2 } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";

function MessageContainer({ messages }) {
  return (
    <Grid2
      container
      className="hidden-scroll"
      direction="column-reverse"
      wrap="nowrap"
      sx={{
        justifyContent: "flex-start",
        width: "100%",
        px: 4,
        py: 2,
        overflow: "auto",
        height: "100%",
      }}
    >
      <ChatMessage filler />
      {messages.map((message, index, array) => (
        <ChatMessage
          key={`chat-message-${index}`}
          {...message}
          prevSender={array[index - 1] && array[index - 1].sender}
        />
      ))}
    </Grid2>
  );
}

export default MessageContainer;
