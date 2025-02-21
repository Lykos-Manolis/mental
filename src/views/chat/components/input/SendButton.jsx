import React from "react";
import { Grid2, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

function SendButton({ handleClick, modelLoading, isModelReady, text }) {
  return (
    <Grid2
      size={4}
      sx={{
        zIndex: 1,
        alignSelf: "end",
        mb: 4,
      }}
    >
      <IconButton
        aria-label="send"
        onClick={handleClick}
        disabled={modelLoading || !isModelReady || !text.replace(/\s/g, "")}
        sx={{
          borderRadius: 10,
          ml: 1,
          bgcolor: "background.inverse",
          color: "primary.main",
        }}
      >
        <UploadIcon sx={{ width: 20, height: 20 }} />
      </IconButton>
    </Grid2>
  );
}

export default SendButton;
