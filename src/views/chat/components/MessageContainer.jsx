import { CircularProgress, Grid2 } from "@mui/material";
import React from "react";
import ChatMessage from "./ChatMessage";
import { useGetUserId } from "../../../hooks/useGetUserId";

function MessageContainer({ messages, isLoading }) {
  const userId = useGetUserId();
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
            sent_by_user={message.sender_id === userId}
            extraSpace={
              array[index + 1] &&
              (array[index + 1].sender_id === userId) !==
                (message.sender_id === userId)
            }
          />
        ))
      )}
    </Grid2>
  );
}

export default MessageContainer;
