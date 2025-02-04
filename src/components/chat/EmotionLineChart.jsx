import { Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react";

function EmotionLineChart({ monthLabels, monthlyGraphData }) {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ my: 4 }}
    >
      <Typography variant="h6">Emotional graph of the month</Typography>
      <LineChart
        xAxis={[{ scaleType: "point", data: monthLabels }]}
        series={monthlyGraphData}
        height={300}
        margin={{ top: 100, bottom: 20 }}
      />
    </Stack>
  );
}

export default EmotionLineChart;
