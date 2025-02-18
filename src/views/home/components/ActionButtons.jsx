import React from "react";
import { Button, Stack, Grid2, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ActionButtons({ onOpenContactModal, onOpenFavoritesModal }) {
  return (
    <Grid2
      container
      sx={{
        justifyContent: "space-around",
        boxShadow: "0px 40px 50px rgba(0, 0, 0, 1)",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
      }}
    >
      <Grid2>
        <IconButton onClick={onOpenContactModal}>
          <ControlPointIcon sx={{ color: "#5727C7", width: 30, height: 30 }} />
        </IconButton>
      </Grid2>
      <Grid2>
        <IconButton onClick={onOpenFavoritesModal}>
          <FavoriteBorderIcon
            sx={{ color: "#5727C7", width: 30, height: 30 }}
          />
        </IconButton>
      </Grid2>
    </Grid2>
  );
}

export default ActionButtons;
