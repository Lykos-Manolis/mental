import React from "react";
import { Button, Stack } from "@mui/material";

function ActionButtons({ onOpenContactModal, onOpenFavoritesModal }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 5 }}>
      <Button
        variant="contained"
        sx={{ borderRadius: 100, width: 80, height: 30 }}
        onClick={onOpenContactModal}
      >
        Create
      </Button>
      <Button
        variant="contained"
        sx={{ borderRadius: 100, width: 80, height: 30 }}
        onClick={onOpenFavoritesModal}
      >
        Edit
      </Button>
    </Stack>
  );
}

export default ActionButtons;
