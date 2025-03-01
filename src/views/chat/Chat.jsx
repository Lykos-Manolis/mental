import React, { useState } from "react";
import { Grid2 } from "@mui/material";
import ChatContainer from "./components/chat/ChatContainer";
import { useAuth } from "../../auth/AuthContext";
import { useGetConversationMessages } from "../../hooks/useGetConversationMessages";
import { useGetConversationInfo } from "../../hooks/useGetConversationInfo";
import { useEmotionColors } from "../../hooks/useEmotionColors";
import { useParams, Navigate } from "react-router-dom";
import anime from "animejs";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useEmotionPrediction } from "../../hooks/useEmotionPrediction";
import AnalyticsDrawer from "./components/navigation/AnalyticsDrawer";
import ContactNav from "./components/navigation/ContactNav";
import ChatInput from "./components/input/ChatInput";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import BackgroundGradients from "./components/background/BackgroundGradients";
import { useMessageHandler } from "../../hooks/useMessageHandler";

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

  // Message Handler Hook
  const updateBackgroundColor = (newColor) => {
    setBackgroundColors((prev) => [...prev.slice(0), newColor]);
  };

  // Message Handler Hook
  const {
    text,
    setText,
    handleEnter,
    handleKeyDown,
    modelLoading,
    isModelReady,
  } = useMessageHandler(chatId, updateBackgroundColor);

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
        pt: 2,
        background: "black",
      }}
    >
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
        isModelReady={isModelReady}
        modelLoading={modelLoading}
        handleEnter={handleEnter}
      />

      <BackgroundGradients backgroundColors={backgroundColors} />

      <AnalyticsDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </Grid2>
  );
}

export default Chat;
