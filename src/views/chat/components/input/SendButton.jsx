import React from "react";
import { Grid2, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

function SendButton({ handleClick, focusInput }) {
  return (
    <Grid2
      size={4}
      sx={{
        zIndex: 1,
        alignSelf: "end",
        mb: 4,
        position: "fixed",
        bottom: 10,
        right: 0,
      }}
    >
      <IconButton
        aria-label="send"
        onClick={async (e) => {
          e.preventDefault();
          focusInput();
          await handleClick();
        }}
        sx={{
          borderRadius: 10,
          ml: 1,
          bgcolor: "background.contrast",
          color: "primary.main",
        }}
      >
        <UploadIcon sx={{ width: 27, height: 27 }} />
      </IconButton>
    </Grid2>
  );
}

export default SendButton;
