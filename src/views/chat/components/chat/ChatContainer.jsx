import React, { useEffect, useRef } from "react";
import { Grid2 } from "@mui/material";
import ChatMessage from "./ChatMessage";
import { useGetUserId } from "../../../../hooks/useGetUserId";

function ChatContainer({ messages, isLoading }) {
  const userId = useGetUserId();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <Grid2
      container
      className="hidden-scroll"
      direction="column"
      wrap="nowrap"
      sx={{
        justifyContent: "flex-start",
        width: "100vw",
        height: "78vh",
        px: 4,
        py: 2,
        overflow: "auto",
        backgroundColor: "transparent",
        backgroundImage: "none",
        position: "relative",
        zIndex: 1,
      }}
    >
      <>
        {messages.map((message, index, array) => {
          const currentMessage = message;
          const nextMessage = array[index + 1];
          const isCurrentMessageFromUser = currentMessage.sender_id === userId;

          const extraSpace =
            nextMessage &&
            isCurrentMessageFromUser !== (nextMessage.sender_id === userId);

          return (
            <ChatMessage
              key={`chat-message-${index}`}
              {...message}
              sent_by_user={isCurrentMessageFromUser}
              extraSpace={extraSpace}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </>
    </Grid2>
  );
}

export default ChatContainer;
