import React from "react";
import { Grid2, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { CHART_DATA } from "../../../../../constants/mock/api";

function PieCard({ emotionPercentage, activeEmotion }) {
  return (
    <Grid2 width="100%" sx={{ bgcolor: "black", padding: 2, borderRadius: 7 }}>
      <PieChart
        series={[
          {
            data: [
              {
                id: 0,
                value: emotionPercentage,
                label: activeEmotion.label,
                color: activeEmotion.color,
              },
              {
                id: 1,
                value: 100 - emotionPercentage,
                label: "Other",
                color: "white",
              },
            ],
            innerRadius: 10,
            outerRadius: 40,
            paddingAngle: 4,
            cornerRadius: 5,
          },
        ]}
        width={220}
        height={100}
        slotProps={{ legend: { hidden: true } }}
      />
      <Typography variant="subtitle2">
        A total of <b>{activeEmotion.totalMessages}</b> messages
      </Typography>
    </Grid2>
  );
}

export default PieCard;
