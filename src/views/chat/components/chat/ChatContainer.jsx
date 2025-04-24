import React, { useEffect, useRef, useState } from "react";
import { Grid2, Skeleton } from "@mui/material";
import ChatMessage from "./ChatMessage";
import { useGetUserId } from "../../../../hooks/useGetUserId";
import NoChat from "./NoChat";

function ChatContainer({
  messages,
  isLoading,
  updateUserEmotion,
  updatePartnerEmotion,
  userId: propUserId,
}) {
  const hookUserId = useGetUserId();
  const userId = propUserId || hookUserId;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return isLoading ? (
    <Grid2
      container
      className="hidden-scroll"
      direction="column"
      wrap="nowrap"
      sx={{
        justifyContent: "flex-start",
        width: "100vw",
        height: "68vh",
        px: 5,
        my: 2,
        overflow: "auto",
        backgroundImage: "none",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
        }}
      >
        <Skeleton
          variant="rounded"
          height={35}
          width={100}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 0.5,
        }}
      >
        <Skeleton
          variant="rounded"
          height={35}
          width={100}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Skeleton
          variant="rounded"
          height={35}
          width={200}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          mb: 0.5,
        }}
      >
        <Skeleton
          variant="rounded"
          height={35}
          width={150}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
        }}
      >
        <Skeleton
          variant="rounded"
          height={70}
          width={200}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Skeleton
          variant="rounded"
          height={75}
          width={200}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
        }}
      >
        <Skeleton
          variant="rounded"
          height={35}
          width={100}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 0.5,
        }}
      >
        <Skeleton
          variant="rounded"
          height={35}
          width={100}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Skeleton
          variant="rounded"
          height={35}
          width={200}
          sx={{ borderRadius: 5 }}
        />
      </Grid2>
    </Grid2>
  ) : (
    <Grid2
      container
      className="chat-container"
      direction="column"
      wrap="nowrap"
      sx={{
        justifyContent: "flex-start",
        width: "100vw",
        height: "68vh",
        px: 5,
        my: 2,
        overflow: "auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {!isLoading && messages?.length === 0 ? (
        <NoChat />
      ) : (
        messages.map((message, index, array) => {
          const currentMessage = message;
          const nextMessage = array[index + 1];
          const isCurrentMessageFromUser = currentMessage.sender_id === userId;
          const messageId = `message-${index}`;

          const extraSpace =
            nextMessage &&
            isCurrentMessageFromUser !== (nextMessage.sender_id === userId);

          return (
            <Grid2
              key={`chat-message-${index}`}
              className="chat-message-item"
              data-message-id={messageId}
              data-message-emotion={message.emotion || "neutral"}
              data-sender={isCurrentMessageFromUser ? "user" : "partner"}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: isCurrentMessageFromUser
                  ? "flex-end"
                  : "flex-start",
                mb: extraSpace ? 2 : 0.5,
              }}
            >
              <ChatMessage
                {...message}
                index={index}
                sent_by_user={isCurrentMessageFromUser}
                extraSpace={extraSpace}
                updateUserEmotion={updateUserEmotion}
                updatePartnerEmotion={updatePartnerEmotion}
                isOptimistic={message.isOptimistic || false}
              />
            </Grid2>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </Grid2>
  );
}

export default ChatContainer;
