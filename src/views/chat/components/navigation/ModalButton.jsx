import React from "react";
import { Grid2, Tooltip, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

function ModalButton({ id, toggleDrawer }) {
  return (
    <Grid2>
      <IconButton aria-label="toggle drawer" id={id} onClick={toggleDrawer}>
        <DonutLargeIcon
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

export default ModalButton;
