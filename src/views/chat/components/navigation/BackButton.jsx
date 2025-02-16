import React from "react";
import { Grid2, IconButton } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <Grid2 size={0.8} sx={{ zIndex: 1, alignContent: "center" }}>
      <IconButton component={Link} to="/home">
        <NavigateBeforeRoundedIcon fontSize="large" />
      </IconButton>
    </Grid2>
  );
}

export default BackButton;
