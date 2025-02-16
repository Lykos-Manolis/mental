import React, { useState, useEffect } from "react";
import { Grid2 } from "@mui/material";
import BackButton from "./components/navigation/BackButton";
import ContactIcon from "./components/navigation/ContactIcon";
import NameStatus from "./components/navigation/NameStatus";
import NavButton from "./components/navigation/NavButton";
import ChatContainer from "./components/chat/ChatContainer";
import MessageInput from "./components/input/MessageInput";
import SendButton from "./components/input/SendButton";
import { useAuth } from "../../auth/AuthContext";
import { useGetConversationMessages } from "../../hooks/useGetConversationMessages";
import { useGetConversationInfo } from "../../hooks/useGetConversationInfo";
import { useEmotionColors } from "../../hooks/useEmotionColors";
import { useParams, Navigate } from "react-router-dom";
import anime from "animejs";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useEmotionPrediction } from "../../hooks/useEmotionPrediction";
import AnalyticsDrawer from "./components/navigation/AnalyticsDrawer";
function Chat() {
  // State
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const { session, isLoading } = useAuth();

  // Don't redirect if still loading the session
  if (!session && !isLoading) {
    return <Navigate to="/" replace />;
  }

  // Get chat ID from url
  const { chatId } = useParams();

  // API Hooks
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
  const { backgroundColors, setBackgroundColors } = useEmotionColors(
    messages,
    conversationInfo,
    session?.user?.id,
  );

  // Handlers
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // Add animation for SVG gradient stops
  useEffect(() => {
    anime({
      targets: "#analytics-button",
      backgroundColor: backgroundColors[1],
      easing: "easeInOutSine",
      duration: 600,
    });

    anime({
      targets: "#settings-button",
      backgroundColor: backgroundColors[1],
      easing: "easeInOutSine",
      duration: 700,
    });

    anime({
      targets: "#gradient-stop-1",
      stopColor: backgroundColors[1],
      easing: "easeInOutQuad",
      duration: 800,
    });

    anime({
      targets: "#gradient-stop-2",
      stopColor: backgroundColors[0],
      easing: "easeInOutQuad",
      duration: 800,
    });
  }, [backgroundColors]);

  const updateBackgroundColor = (newColor) => {
    setBackgroundColors((prev) => [...prev.slice(1), newColor]);
  };

  // Send message logic
  const [text, setText] = useState("");

  const { sendMessage } = useSendMessage();

  const { predictEmotion, modelLoading, isModelReady } = useEmotionPrediction();

  const handleEnter = async () => {
    try {
      const { emotion, color } = await predictEmotion(text);

      console.log(`Predicted: ${emotion}\n---\nInput: ${text}`);
      sendMessage(text, emotion, chatId);

      updateBackgroundColor(color);
      setText("");
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  const handleKeyDown = async (pressedKey) => {
    if (pressedKey === "Enter" && !modelLoading && isModelReady && text) {
      await handleEnter();
    }
  };

  const isOnlineToday = (lastSignIn) => {
    if (!lastSignIn) return false;
    const now = new Date();
    const signInDate = new Date(lastSignIn);
    const diffInMinutes = (now - signInDate) / (1000 * 60);
    return diffInMinutes <= 60;
  };

  useEffect(() => {
    setIsOnline(isOnlineToday(conversationInfo?.last_sign_in));
  }, [conversationInfo]);

  return (
    <Grid2
      container
      spacing={0}
      sx={{
        height: "100vh",
        width: "100vw",
        pt: "10%",
        background:
          "linear-gradient(180deg, rgb(255,255,255) 12%, rgb(0,0,0) 100%)",
      }}
    >
      {/* Navigation */}
      <BackButton />
      <ContactIcon conversationInfo={conversationInfo} isOnline={isOnline} />
      <NameStatus conversationInfo={conversationInfo} />
      <NavButton
        contactColor={backgroundColors[1]}
        toggleDrawer={toggleDrawer}
        icon="analytics"
        title="View Analytics"
        id="analytics-button"
      />
      <NavButton
        contactColor={backgroundColors[1]}
        icon="settings"
        title="Settings"
        id="settings-button"
      />

      {/* Chat */}
      <ChatContainer messages={messages} isLoading={isLoadingMessages} />

      {/* Input */}
      <MessageInput
        text={text}
        setText={setText}
        handleKeyDown={handleKeyDown}
      />
      <SendButton
        text={text}
        modelLoading={modelLoading}
        isModelReady={isModelReady}
        handleClick={handleEnter}
      />

      {/* Chat Background */}
      <svg
        style={{
          width: "100%",
          height: "96%",
          position: "absolute",
          zIndex: 0,
          bottom: 0,
          left: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1505 800"
        preserveAspectRatio="xMaxYMin slice"
      >
        <path
          fill="url(#a)"
          d="M.5 0H1348c16.57 0 30 13.431 30 30v1.5c0 16.569 13.43 30 30 30h67c16.57 0 30 13.431 30 30V1497H.5V0Z"
        />
        <defs>
          <linearGradient
            id="a"
            x1="1308.5"
            x2="1308.5"
            y1="0"
            y2="817.999"
            gradientUnits="userSpaceOnUse"
          >
            <stop id="gradient-stop-1" stopOpacity=".8" />
            <stop id="gradient-stop-2" offset="1" stopOpacity=".8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Analytics Drawer */}
      <AnalyticsDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </Grid2>
  );
}

export default Chat;
