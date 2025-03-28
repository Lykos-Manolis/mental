import React from "react";
import { Grid2, Typography } from "@mui/material";
import EmotionMenu from "../menu/EmotionMenu";
function AnalyticsHeader() {
  return (
    <Grid2
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Chat analytics
      </Typography>
      <EmotionMenu />
    </Grid2>
  );
}

export default AnalyticsHeader;
