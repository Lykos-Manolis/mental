import { Grid2 } from "@mui/material";
import React, { useRef } from "react";
import MessageInput from "./MessageInput";
import SendButton from "./SendButton";

function ChatInput({ text, setText, handleKeyDown, handleSend }) {
  const inputRef = useRef();

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
        inputRef={inputRef}
      />
      <SendButton
        handleClick={handleSend}
        focusInput={() => inputRef.current?.focus()}
      />
    </Grid2>
  );
}

export default ChatInput;
