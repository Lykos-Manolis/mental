import React from "react";
import FaveBubble from "./FaveBubble";
import { Stack } from "@mui/material";

function FaveBubbles({ faves }) {
  const hoverStyle = {
    transition: "width 0.3s, height 0.3s",
    "&:hover": {
      width: 70,
      height: 70,
    },
  };
  return (
    <>
      <Stack direction="row" sx={{ m: 1, justifyContent: "space-around" }}>
        {faves.map((fave) => (
          <FaveBubble key={fave.id} {...fave} sx={hoverStyle} />
        ))}
      </Stack>
    </>
  );
}

export default FaveBubbles;
