import React, { useEffect, useRef, useState } from "react";
import { Grid2, Skeleton } from "@mui/material";
import ChatMessage from "./ChatMessage";
import { useGetUserId } from "../../../../hooks/useGetUserId";

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
  const containerRef = useRef(null);
  const [visibleMessages, setVisibleMessages] = useState({});
  const [bottomEdgeMessages, setBottomEdgeMessages] = useState(new Set());
  // Track animated emotions per sender to avoid duplicates
  const [animatedEmotions, setAnimatedEmotions] = useState({
    user: new Set(),
    partner: new Set(),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Fade effect observer
    const fadeOptions = {
      root: containerRef.current,
      rootMargin: "0px 0px 100px 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    // Animation observer
    const animationOptions = {
      root: containerRef.current,
      rootMargin: "0px 0px 0px 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const handleFadeIntersection = (entries) => {
      const newVisibility = { ...visibleMessages };

      entries.forEach((entry) => {
        const messageId = entry.target.dataset.messageId;
        const messageIndex = messageId?.split("-")[1];
        if (messageId && messageIndex !== undefined) {
          // Calculate opacity based on intersection ratio and position
          const { bottom } = entry.boundingClientRect;
          const containerBottom = entry.rootBounds.bottom;
          const distanceFromBottom = containerBottom - bottom;

          let opacity = entry.intersectionRatio;

          // Apply additional fade when close to the bottom
          if (distanceFromBottom < 100 && distanceFromBottom >= 0) {
            opacity = opacity * (distanceFromBottom / 100);
          }

          newVisibility[messageId] = opacity;
        }
      });

      setVisibleMessages(newVisibility);
    };

    const handleAnimationIntersection = (entries) => {
      const newBottomEdgeMessages = new Set(bottomEdgeMessages);
      const newAnimatedEmotions = {
        user: new Set(animatedEmotions.user),
        partner: new Set(animatedEmotions.partner),
      };

      entries.forEach((entry) => {
        const messageId = entry.target.dataset.messageId;
        const messageIndex = messageId?.split("-")[1];

        if (messageId && messageIndex !== undefined) {
          // Get the message's position information
          const rect = entry.boundingClientRect;
          const rootRect = entry.rootBounds;

          const isAtBottomEdge =
            rect.bottom <= rootRect.bottom + 5 &&
            rect.bottom >= rootRect.bottom - 20;

          // Only trigger animation if:
          // 1. The message is at the bottom edge
          // 2. It hasn't been processed yet
          if (isAtBottomEdge && !newBottomEdgeMessages.has(messageId)) {
            const message = messages[parseInt(messageIndex)];

            if (message && message.emotion) {
              const isFromUser = message.sender_id === userId;
              const senderType = isFromUser ? "user" : "partner";

              // Check if this emotion has already been animated for this sender
              if (!newAnimatedEmotions[senderType].has(message.emotion)) {
                if (isFromUser && updateUserEmotion) {
                  updateUserEmotion(message.emotion);
                } else if (!isFromUser && updatePartnerEmotion) {
                  updatePartnerEmotion(message.emotion);
                }

                newAnimatedEmotions[senderType].add(message.emotion);
              }

              newBottomEdgeMessages.add(messageId);
            }
          }
        }
      });

      setBottomEdgeMessages(newBottomEdgeMessages);
      setAnimatedEmotions(newAnimatedEmotions);
    };

    const fadeObserver = new IntersectionObserver(
      handleFadeIntersection,
      fadeOptions,
    );
    const animationObserver = new IntersectionObserver(
      handleAnimationIntersection,
      animationOptions,
    );

    const messageElements =
      containerRef.current.querySelectorAll(".chat-message-item");
    messageElements.forEach((el) => {
      fadeObserver.observe(el);
      animationObserver.observe(el);
    });

    // Handle scrolling behavior and reset animated emotions
    const handleScroll = () => {
      if (containerRef.current) {
        const visibleElements = Array.from(
          containerRef.current.querySelectorAll(".chat-message-item"),
        ).filter((el) => {
          const rect = el.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          return (
            rect.top >= containerRect.top && rect.bottom <= containerRect.bottom
          );
        });

        if (visibleElements.length > 0) {
          const firstVisibleId = visibleElements[0].dataset.messageId;
          const lastLoggedId = Array.from(bottomEdgeMessages).pop();

          if (
            firstVisibleId &&
            lastLoggedId &&
            parseInt(firstVisibleId.split("-")[1]) <
              parseInt(lastLoggedId.split("-")[1]) - 5
          ) {
            setBottomEdgeMessages(new Set());
            setAnimatedEmotions({
              user: new Set(),
              partner: new Set(),
            });
          }
        }
      }
    };

    containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      fadeObserver.disconnect();
      animationObserver.disconnect();
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [
    messages,
    visibleMessages,
    bottomEdgeMessages,
    animatedEmotions,
    userId,
    updateUserEmotion,
    updatePartnerEmotion,
  ]);

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
      ref={containerRef}
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
      {messages.map((message, index, array) => {
        const currentMessage = message;
        const nextMessage = array[index + 1];
        const isCurrentMessageFromUser = currentMessage.sender_id === userId;
        const messageId = `message-${index}`;
        const opacity =
          visibleMessages[messageId] !== undefined
            ? visibleMessages[messageId]
            : 1;

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
              opacity: opacity,
              transition: "opacity 0.2s ease-out",
            }}
          >
            <ChatMessage
              {...message}
              sent_by_user={isCurrentMessageFromUser}
              extraSpace={extraSpace}
            />
          </Grid2>
        );
      })}
      <div ref={messagesEndRef} />
    </Grid2>
  );
}

export default ChatContainer;
