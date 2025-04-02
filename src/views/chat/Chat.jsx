import React, { useState } from "react";
import { Alert, Button, Collapse, Grid2, Typography } from "@mui/material";
import ChatContainer from "./components/chat/ChatContainer";
import { useAuth } from "../../auth/AuthContext";
import { useGetConversationMessages } from "../../hooks/useGetConversationMessages";
import { useGetConversationInfo } from "../../hooks/useGetConversationInfo";
import { useEmotionColors } from "../../hooks/useEmotionColors";
import { useParams, Navigate } from "react-router-dom";
import anime from "animejs";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import BackgroundGradients from "./components/background/BackgroundGradients";
import { useMessageHandler } from "../../hooks/useMessageHandler";
import AnalyticsDrawer from "./components/navigation/AnalyticsDrawer";
import ContactNav from "./components/navigation/ContactNav";
import ChatInput from "./components/input/ChatInput";

function Chat() {
  // Auth & Navigation
  const { session, isLoading } = useAuth();
  const { chatId } = useParams();

  // UI State
  const [openDrawer, setOpenDrawer] = useState(false);

  // Data Hooks
  const { messages, isLoading: isLoadingMessages } =
    useGetConversationMessages(chatId);
  const { conversationInfo, isLoading: isLoadingConversationInfo } =
    useGetConversationInfo(chatId);
  const { backgroundColors, setBackgroundColors } = useEmotionColors(
    messages,
    conversationInfo,
    session?.user?.id,
  );
  const isOnline = useOnlineStatus(conversationInfo?.last_sign_in);

  // Update background color function
  const updateBackgroundColor = (newColor) => {
    setBackgroundColors((prev) => [...prev.slice(0), newColor]);
  };

  // Message Handler Hook
  const { text, setText, handleSend, error, dismissError, handleKeyDown } =
    useMessageHandler(chatId, updateBackgroundColor, session?.user?.id);

  // UI Handlers
  const toggleDrawer = () => setOpenDrawer(!openDrawer);

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
            width: { xs: "90vw", sm: "60vw", md: "50vw" },
            zIndex: 1000,
            boxShadow: 4,
          }}
        >
          {error}
        </Alert>
      )}

      <ContactNav
        conversationInfo={conversationInfo}
        isLoading={isLoadingConversationInfo}
        isOnline={isOnline}
        toggleDrawer={toggleDrawer}
      />

      <ChatContainer messages={messages} isLoading={isLoadingMessages} />

      <ChatInput
        text={text}
        setText={setText}
        handleKeyDown={handleKeyDown}
        handleSend={handleSend}
      />

      <BackgroundGradients backgroundColors={backgroundColors} />

      <AnalyticsDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </Grid2>
  );
}

export default Chat;
