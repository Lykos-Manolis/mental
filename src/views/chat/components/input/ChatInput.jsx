import { Grid2 } from "@mui/material";
import React from "react";
import MessageInput from "./MessageInput";
import SendButton from "./SendButton";

function ChatInput({ text, setText, handleKeyDown, handleSend }) {
  return (
    <Grid2
      size={12}
      container
      sx={{
        justifyContent: "space-around",
        height: "10vh",
        zIndex: 1,
      }}
    >
      <MessageInput
        text={text}
        setText={setText}
        handleKeyDown={handleKeyDown}
      />
      <SendButton handleClick={handleSend} />
    </Grid2>
  );
}

export default ChatInput;
