import React from "react";
import { Grid2 } from "@mui/material";
import AnalyticsHeader from "./sections/AnalyticsHeader";
import AnalyticsBody from "./sections/AnalyticsBody";

function Analytics() {
  return (
    <Grid2 container sx={{ zIndex: 1 }}>
      <AnalyticsHeader />
      <AnalyticsBody />
    </Grid2>
  );
}

export default Analytics;
