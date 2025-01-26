import React from "react";
import FaveBubble from "./FaveBubble";
import { Stack } from "@mui/material";

function FaveBubbles({ faves }) {
  return (
    <>
      <Stack alignItems="center">
        <FaveBubble {...faves[0]} sx={{ width: 70, height: 70 }} />
      </Stack>
      <Stack direction="row" sx={{ m: 1, justifyContent: "space-around" }}>
        <FaveBubble {...faves[1]} />
        <FaveBubble {...faves[2]} />
      </Stack>
      <Stack alignItems="center">
        <FaveBubble {...faves[3]} />
      </Stack>
    </>
  );
}

export default FaveBubbles;
