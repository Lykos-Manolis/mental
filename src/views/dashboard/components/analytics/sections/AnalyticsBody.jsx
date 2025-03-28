import React from "react";
import { Grid2, Typography } from "@mui/material";
import PercentageCard from "../cards/PercentageCard";
import PieCard from "../cards/PieCard";
import StatisticCard from "../cards/StatisticCard";
import LineCard from "../cards/LineCard";
import MapCard from "../cards/MapCard";

function AnalyticsBody() {
  return (
    <Grid2
      container
      spacing={0}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid2
        container
        spacing={3}
        sx={{ justifyContent: "center", width: "100%", flexWrap: "nowrap" }}
      >
        <PercentageCard />
        <PieCard />
      </Grid2>
      <StatisticCard />
      <LineCard />
      <MapCard />
    </Grid2>
  );
}

export default AnalyticsBody;
