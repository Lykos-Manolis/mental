import React from "react";
import { Grid2, Typography } from "@mui/material";
function PercentageCard() {
  return (
    <Grid2
      width="100%"
      sx={{
        bgcolor: "#FF0055",
        padding: 2,
        borderRadius: 7,
        color: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        24<span style={{ fontSize: "16px" }}>%</span>
      </Typography>
      <Typography variant="subtitle2">
        Of your messages have this <b>emotion</b>
      </Typography>
    </Grid2>
  );
}

export default PercentageCard;
