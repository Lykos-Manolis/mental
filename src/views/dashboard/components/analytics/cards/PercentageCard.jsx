import React from "react";
import { Grid2, Typography, useTheme } from "@mui/material";
function PercentageCard({ percentage, background }) {
  const theme = useTheme();

  return (
    <Grid2
      width="100%"
      sx={{
        bgcolor: background,
        padding: 2,
        borderRadius: 7,
        color: theme.palette.text.contrast,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" color="black" sx={{ fontWeight: "bold" }}>
        {percentage}
        <span style={{ fontSize: "16px" }}>%</span>
      </Typography>
      <Typography variant="subtitle2" color="black">
        Of your messages have this <b>emotion</b>
      </Typography>
    </Grid2>
  );
}

export default PercentageCard;
