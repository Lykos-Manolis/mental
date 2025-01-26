import { Avatar, Grid2, IconButton, InputBase, TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

function ChatTextField() {
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
        sx={{
          width: "100%",
          border: "2px solid lightblue",
          borderRadius: "0.5em",
          backdropFilter: "blur(7px)",
          p: 1,
        }}
      />
      <IconButton
        aria-label="send"
        sx={{
          border: "1px solid gray",
          borderRadius: 1,
          ml: 0.5,
          bgcolor: "#147efb",
          height: "50%",
        }}
      >
        <SendIcon />
      </IconButton>
    </Grid2>
  );
}

export default ChatTextField;
