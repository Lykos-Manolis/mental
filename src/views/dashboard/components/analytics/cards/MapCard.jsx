import React from "react";
import { Grid2, Typography } from "@mui/material";
import {
  AreaPlot,
  ChartContainer,
  LineChart,
  ScatterChart,
} from "@mui/x-charts";
import {
  MONTHLY_GRAPH_DATA,
  MONTHLY_SCATTER_DATA,
} from "../../../../../constants/mock/api";
import { MONTH_LABELS } from "../../../../../constants/chart";

function MapCard({ monthlyData }) {
  const legendPlacement = {
    slotProps: {
      legend: {
        position: {
          vertical: "bottom",
          horizontal: "middle",
        },
        direction: "row",
        itemGap: 10,
      },
    },
    margin: {
      top: 10,
      bottom: 150,
    },
  };

  return (
    <Grid2
      container
      width="100%"
      sx={{ bgcolor: "black", borderRadius: 7, p: 2, mb: 4 }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", width: "100%" }}
      >
        Monthly scatter
      </Typography>
      <ScatterChart
        height={400}
        series={monthlyData}
        xAxis={[{ min: 0 }]}
        {...legendPlacement}
      />
    </Grid2>
  );
}

export default MapCard;
