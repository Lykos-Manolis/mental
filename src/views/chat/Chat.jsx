import React, { useState, useCallback, useEffect } from "react";
import { Alert, Grid2, AlertTitle } from "@mui/material";
import ChatContainer from "./components/chat/ChatContainer";
import { useAuth } from "../../auth/AuthContext";
import { useGetConversationMessages } from "../../hooks/useGetConversationMessages";
import { useGetConversationInfo } from "../../hooks/useGetConversationInfo";
import { useEmotionColors } from "../../hooks/useEmotionColors";
import { useParams, Navigate } from "react-router-dom";
import { animate } from "animejs";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import BackgroundGradients from "./components/background/BackgroundGradients";
import { useMessageHandler } from "../../hooks/useMessageHandler";
import ContactNav from "./components/navigation/ContactNav";
import ChatInput from "./components/input/ChatInput";
import { useTheme } from "@mui/material";

function Chat() {
  // Auth & Navigation
  const { session, isLoading } = useAuth();
  const { chatId } = useParams();
  const theme = useTheme();

  // Data Hooks
  const {
    decryptedMessages: messages,
    isLoading: isLoadingMessages,
    addOptimisticMessage,
  } = useGetConversationMessages(chatId);
  const { conversationInfo, isLoading: isLoadingConversationInfo } =
    useGetConversationInfo(chatId);
  const { backgroundColors, setBackgroundColors } = useEmotionColors(
    messages,
    conversationInfo,
    session?.user?.id,
  );
  const isOnline = useOnlineStatus(conversationInfo?.last_sign_in);

  // Update background color function for message sending
  const updateBackgroundColor = (newColor) => {
    setBackgroundColors((prev) => [...prev.slice(0), newColor]);
  };

  // Separate update functions for user and partner emotion detection
  const updateUserEmotion = useCallback(
    (emotion) => {
      if (emotion && theme.palette.emotion[emotion]) {
        animate(["#gradient-1", "#gradient-2", "#gradient-3"], {
          fill: theme.palette.emotion[emotion],
          easing: "easeInOutQuad",
          duration: 500,
        });
      }
    },
    [theme.palette.emotion],
  );

  const updatePartnerEmotion = useCallback(
    (emotion) => {
      if (emotion && theme.palette.emotion[emotion]) {
        animate(["#gradient-4", "#gradient-5", "#gradient-6"], {
          fill: theme.palette.emotion[emotion],
          easing: "easeInOutQuad",
          duration: 800,
        });
      }
    },
    [theme.palette.emotion],
  );

  // Message Handler Hook
  const { text, setText, handleSend, error, dismissError, handleKeyDown } =
    useMessageHandler(
      chatId,
      updateBackgroundColor,
      session?.user?.id,
      addOptimisticMessage,
    );

  // Auth redirect
  if (!session && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <Grid2
      container
      spacing={0}
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {error && (
        <Alert
          severity="error"
          onClose={dismissError}
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: { xs: "70vw", sm: "60vw", md: "50vw" },
            zIndex: 1000,
            boxShadow: 4,
          }}
        >
          <AlertTitle>Something went wrong</AlertTitle>
          Please try again in a moment.
        </Alert>
      )}

      <ContactNav
        conversationInfo={conversationInfo}
        isLoading={isLoadingConversationInfo}
        isOnline={isOnline}
      />

      <ChatContainer
        messages={messages}
        isLoading={isLoadingMessages}
        updateUserEmotion={updateUserEmotion}
        updatePartnerEmotion={updatePartnerEmotion}
        userId={session?.user?.id}
      />

      <ChatInput
        text={text}
        setText={setText}
        handleKeyDown={handleKeyDown}
        handleSend={handleSend}
      />

      <BackgroundGradients backgroundColors={backgroundColors} />
    </Grid2>
  );
}

export default Chat;
