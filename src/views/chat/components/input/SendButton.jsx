import React from "react";
import { Grid2, IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

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
          height: "35px",
          width: "35px",
          ml: 1,
          bgcolor: "white",
          color: "purple",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="16"
          fill="none"
          viewBox="0 0 14 16"
        >
          <path
            fill="#5928CB"
            stroke="#5928CB"
            strokeLinecap="round"
            strokeWidth="3"
            d="m11.596 6.78-7.93-4.637c-.912-.533-1.92.527-1.342 1.41l.262.4a7 7 0 0 1 .166 7.397l-.59.998c-.538.908.516 1.922 1.403 1.349l8.07-5.214a1 1 0 0 0-.039-1.704Z"
          />
        </svg>
      </IconButton>
    </Grid2>
  );
}

export default SendButton;
