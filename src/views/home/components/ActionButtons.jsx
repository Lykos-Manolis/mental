import React from "react";
import { Button, Stack } from "@mui/material";

function ActionButtons() {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 5 }}>
      <Button
        variant="contained"
        sx={{ borderRadius: 100, width: 80, height: 30 }}
      >
        Create
      </Button>
      <Button
        variant="contained"
        sx={{ borderRadius: 100, width: 80, height: 30 }}
      >
        Edit
      </Button>
    </Stack>
  );
}

export default ActionButtons;
