import React, { useState, useEffect } from "react";
import ChatContainer from "../components/chat/ChatContainer";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/chat/ChatHeader";
import { Grid2, TextField } from "@mui/material";
import ChatTextField from "../components/chat/ChatTextField";
import anime from "animejs/lib/anime.es.js";
import ChatDrawer from "../components/chat/ChatDrawer";
function ChatView() {
  // Get chat ID from url
  const { chatId } = useParams();

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // Fetch chat info based on ID
  const chatInfo = chatId && {
    contactName: "Jane Doe",
    contactAvatar: "../src/assets/avatars/avatar_1.jpeg",
    contactChat: [
      {
        sender: "contact",
        messageContent: "Yo!!",
      },
      {
        sender: "contact",
        messageContent: "Hello!",
      },
      {
        sender: "contact",
        messageContent: "What's up?",
      },
      {
        sender: "user",
        messageContent: "Hey man, what's up?",
      },
      {
        sender: "contact",
        messageContent:
          "I'm ok. I am studying really hard to pass my exams and it's taking a lot more time than I thought. When I started working I thought I'd be done in about a week or so but its been a year and still no real progress..",
      },
      {
        sender: "contact",
        messageContent: "hbu?",
      },
      {
        sender: "user",
        messageContent: "not reading allat bud",
      },
      {
        sender: "contact",
        messageContent: "bruh..",
      },
      {
        sender: "contact",
        messageContent: "...",
      },
      {
        sender: "user",
        messageContent: "👍🏻",
      },
      {
        sender: "contact",
        messageContent: "Yo!!",
      },
      {
        sender: "contact",
        messageContent: "Hello!",
      },
      {
        sender: "contact",
        messageContent: "What's up?",
      },
      {
        sender: "user",
        messageContent: "Hey man, what's up?",
      },
      {
        sender: "contact",
        messageContent:
          "I'm ok. I am studying really hard to pass my exams and it's taking a lot more time than I thought. When I started working I thought I'd be done in about a week or so but its been a year and still no real progress..",
      },
      {
        sender: "contact",
        messageContent: "hbu?",
      },
      {
        sender: "user",
        messageContent: "not reading allat bud",
      },
      {
        sender: "contact",
        messageContent: "bruh..",
      },
      {
        sender: "contact",
        messageContent: "...",
      },
      {
        sender: "user",
        messageContent: "👍🏻",
      },
    ],
  };

  // Reverse the chat so it works with column-reverse, to scroll bottom to top
  const reversedChat = chatInfo.contactChat.slice().reverse();

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
      }}
    >
      <ChatHeader
        contactAvatar={chatInfo.contactAvatar}
        contactName={chatInfo.contactName}
        toggleDrawer={toggleDrawer}
      />
      <ChatContainer messages={reversedChat} />
      <ChatTextField onColorUpdate={updateBackgroundColor} />
      <ChatDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </Grid2>
  );
}

export default ChatView;
