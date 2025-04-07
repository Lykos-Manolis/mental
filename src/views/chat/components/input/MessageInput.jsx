import React from "react";
import { Grid2, InputBase } from "@mui/material";

function MessageInput({ text, setText, handleKeyDown }) {
  return (
    <Grid2
      size={8}
      sx={{
        zIndex: 1,
        alignSelf: "end",
        mb: 4,
        position: "fixed",
        bottom: 10,
        left: 0,
      }}
    >
      <InputBase
        id="message-input"
        multiline
        autoFocus
        value={text}
        maxRows={4}
        onKeyDown={async (event) => await handleKeyDown(event.key)}
        onChange={(event) => {
          if (event.target.value !== "\n") setText(event.target.value);
        }}
        placeholder="Go tell 'em champ"
        label="Type your message"
        sx={{
          backgroundColor: "text.primary",
          borderRadius: 10,
          minHeight: "35px",
          width: "100%",
          p: "10px 10px 10px 20px",
          ml: 5,
          color: "text.contrast",
        }}
      />
    </Grid2>
  );
}

export default MessageInput;
