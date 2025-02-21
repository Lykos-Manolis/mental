import React from "react";
import { Grid2, Tooltip, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

function ModalButton({ id, toggleDrawer }) {
  return (
    <Grid2>
      <IconButton id={id} onClick={toggleDrawer}>
        <DonutLargeIcon
          sx={{
            color: "primary.main",
            bgcolor: "background.inverse",
            borderRadius: "50%",
            p: 0.5,
          }}
        />
      </IconButton>
    </Grid2>
  );
}

export default ModalButton;
