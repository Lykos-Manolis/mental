import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Grid2, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <Grid2>
      <IconButton aria-label="back" component={Link} to="/home">
        <KeyboardDoubleArrowLeftIcon
          sx={{
            color: "primary.main",
            bgcolor: "background.contrast",
            borderRadius: "50%",
            p: 0.5,
          }}
        />
      </IconButton>
    </Grid2>
  );
}

export default BackButton;
