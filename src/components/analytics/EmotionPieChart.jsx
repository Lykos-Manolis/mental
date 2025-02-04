import { Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import React from "react";

function EmotionPieChart({ chartData }) {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 4 }}
    >
      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 4,
            cornerRadius: 5,
          },
        ]}
        width={400}
        height={200}
      />
    </Stack>
  );
}

export default EmotionPieChart;
