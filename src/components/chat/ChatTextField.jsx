import { Avatar, Grid2, IconButton, InputBase, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import EmoSendButton from "./EmoSendButton";

function ChatTextField({ onColorUpdate }) {
  const [text, setText] = useState("");

  return (
    <Grid2
      container
      direction="row"
      wrap="nowrap"
      sx={{
        width: "75%",
        pt: 0,
        justifySelf: "flex-end",
        position: "absolute",
        top: "90%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        alignItems: "flex-end",
      }}
    >
      <InputBase
        id="message-input"
        multiline
        maxRows={4}
        placeholder="Type your message"
        label="Type your message"
        onChange={(event) => {
          setText(event.target.value);
        }}
        sx={{
          width: "100%",
          border: "2px solid lightblue",
          borderRadius: "0.5em",
          backdropFilter: "blur(7px)",
          p: 1,
        }}
      />
      <EmoSendButton text={text} onColorUpdate={onColorUpdate} />
    </Grid2>
  );
}

export default ChatTextField;
