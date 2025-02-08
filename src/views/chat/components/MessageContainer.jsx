import { CircularProgress, Grid2 } from "@mui/material";
import React from "react";
import ChatMessage from "./ChatMessage";

function MessageContainer({ messages, isLoading }) {
  return (
    <Grid2
      container
      className="hidden-scroll"
      direction="column"
      wrap="nowrap"
      sx={{
        justifyContent: "flex-start",
        width: "100%",
        height: "80%",
        px: 4,
        py: 2,
        overflow: "auto",
      }}
    >
      {isLoading ? (
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <CircularProgress />
        </Grid2>
      ) : (
        messages.map((message, index, array) => (
          <ChatMessage
            key={`chat-message-${index}`}
            {...message}
            extraSpace={
              array[index + 1] &&
              array[index + 1].sent_by_user !== message.sent_by_user
            }
          />
        ))
      )}
    </Grid2>
  );
}

export default MessageContainer;
