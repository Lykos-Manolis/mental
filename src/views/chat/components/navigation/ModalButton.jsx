import React from "react";
import { Grid2, Tooltip, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

function ModalButton({ id, toggleDrawer }) {
  return (
    <Grid2>
      <IconButton id={id} onClick={toggleDrawer}>
        <DonutLargeIcon
          color="black"
          sx={{ bgcolor: "white", borderRadius: "50%" }}
        />
      </IconButton>
    </Grid2>
  );
}

export default ModalButton;
