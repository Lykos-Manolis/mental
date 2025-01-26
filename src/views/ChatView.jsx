import React from "react";
import ChatContainer from "../components/chat/ChatContainer";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/chat/ChatHeader";
import { Grid2, TextField } from "@mui/material";
import ChatTextField from "../components/chat/ChatTextField";

function ChatView() {
  // Get chat ID from url
  const { chatId } = useParams();

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

  return (
    <Grid2
      container
      direction="column"
      wrap="nowrap"
      sx={{
        height: "100vh",
        background:
          "linear-gradient(to left top,rgba(5, 25, 55,0.5),rgba(0, 77, 122,0.5),rgba(0, 135, 147,0.5),rgba(0, 191, 114,0.5),rgba(168, 235, 18,0.5))",
      }}
    >
      <ChatHeader
        contactAvatar={chatInfo.contactAvatar}
        contactName={chatInfo.contactName}
      />
      <ChatContainer messages={reversedChat} />
      <ChatTextField />
    </Grid2>
  );
}

export default ChatView;
