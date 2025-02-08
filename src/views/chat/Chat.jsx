import React, { useState, useEffect } from "react";
import ChatContainer from "./components/MessageContainer";
import { useParams, Navigate } from "react-router-dom";
import ChatHeader from "./components/ChatHeader";
import { Grid2 } from "@mui/material";
import ChatTextField from "./components/ChatTextField";
import anime from "animejs/lib/anime.es.js";
import ChatDrawer from "./components/ChatDrawer";

import { useAuth } from "../../auth/AuthContext";
import { useGetConversationMessages } from "../../hooks/useGetConversationMessages";
import { useGetConversationInfo } from "../../hooks/useGetConversationInfo";

function Chat() {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/" replace />;
  }
  // Get chat ID from url
  const { chatId } = useParams();
  const {
    messages,
    isLoading: isLoadingMessages,
    error: errorMessages,
  } = useGetConversationMessages(chatId);
  const {
    conversationInfo,
    isLoading: isLoadingConversationInfo,
    error: errorConversationInfo,
  } = useGetConversationInfo(chatId);

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // useState called backgroundGradient
  const [backgroundColors, setBackgroundColors] = useState([
    "rgba(5, 25, 55, 0.1)",
    "rgba(0, 77, 122, 0.1)",
    "rgba(0, 135, 147, 0.1)",
  ]);

  useEffect(() => {
    anime({
      targets: "#emotion-grid",
      background: `linear-gradient(to left top, ${backgroundColors[0]},${backgroundColors[1]},${backgroundColors[2]})`,
      easing: "easeInOutQuad",
    });
  }, [backgroundColors]);

  const updateBackgroundColor = (newColor) => {
    setBackgroundColors((prev) => [...prev.slice(1), newColor]);
  };

  return (
    <Grid2
      id="emotion-grid"
      container
      direction="column"
      wrap="nowrap"
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <ChatHeader
        conversationInfo={conversationInfo}
        isLoading={isLoadingConversationInfo}
        toggleDrawer={toggleDrawer}
      />
      <ChatContainer messages={messages} isLoading={isLoadingMessages} />
      <ChatTextField onColorUpdate={updateBackgroundColor} />
      <ChatDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </Grid2>
  );
}

export default Chat;
