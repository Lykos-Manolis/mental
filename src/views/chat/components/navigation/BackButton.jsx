import React from "react";
import { Grid2, IconButton } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <Grid2>
      <IconButton aria-label="back" component={Link} to="/home">
        <NavigateBeforeRoundedIcon
          color="black"
          sx={{ bgcolor: "white", borderRadius: "50%" }}
        />
      </IconButton>
    </Grid2>
  );
}

export default BackButton;
