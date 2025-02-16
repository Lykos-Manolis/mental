import React from "react";
import { Grid2, IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function SendButton({ handleClick, modelLoading, isModelReady, text }) {
  return (
    <Grid2 size={4} sx={{ zIndex: 1, alignSelf: "end", mb: 4 }}>
      <IconButton
        aria-label="send"
        onClick={handleClick}
        disabled={modelLoading || !isModelReady || !text.replace(/\s/g, "")}
        sx={{
          borderRadius: 10,
          ml: 1,
          bgcolor: "white",
          color: "purple",
        }}
      >
        <SendRoundedIcon />
      </IconButton>
    </Grid2>
  );
}

export default SendButton;
