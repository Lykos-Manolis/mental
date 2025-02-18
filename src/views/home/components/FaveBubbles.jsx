import React from "react";
import FaveBubble from "./FaveBubble";
import { Stack, Grid2 } from "@mui/material";

function FaveBubbles({ faves }) {
  return (
    <Grid2 size={12}>
      <Stack direction="row" sx={{ m: 1, justifyContent: "start" }}>
        {faves.map((fave) => (
          <FaveBubble key={fave.id} {...fave} />
        ))}
      </Stack>
    </Grid2>
  );
}

export default FaveBubbles;
