import React from "react";
import { Grid2, Typography, useTheme } from "@mui/material";
import {
  AreaPlot,
  ChartContainer,
  LineChart,
  ScatterChart,
  axisClasses,
} from "@mui/x-charts";
import {
  MONTHLY_GRAPH_DATA,
  MONTHLY_SCATTER_DATA,
} from "../../../../../constants/mock/api";
import { MONTH_LABELS } from "../../../../../constants/chart";

function MapCard({ monthlyData }) {
  const theme = useTheme();

  return (
    <Grid2
      container
      width="100%"
      sx={{
        bgcolor: "black",
        borderRadius: 7,
        p: 2,
        mb: 4,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", width: "100%" }}
      >
        Monthly scatter
      </Typography>
      <ScatterChart
        height={300}
        series={monthlyData}
        xAxis={[{ min: 1, max: 12 }]}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        sx={{
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: "white",
              strokeWidth: 2,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: "white",
            },
          },
        }}
      />
    </Grid2>
  );
}

export default MapCard;
