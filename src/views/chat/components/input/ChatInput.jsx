import { Grid2 } from "@mui/material";
import React from "react";
import MessageInput from "./MessageInput";
import SendButton from "./SendButton";

function ChatInput({
  text,
  setText,
  handleKeyDown,
  isModelReady,
  modelLoading,
  handleEnter,
}) {
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
      <SendButton
        text={text}
        modelLoading={modelLoading}
        isModelReady={isModelReady}
        handleClick={handleEnter}
      />
    </Grid2>
  );
}

export default ChatInput;
