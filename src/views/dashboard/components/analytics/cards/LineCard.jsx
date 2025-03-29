import React from "react";
import { Grid2, Typography } from "@mui/material";
import { LineChart, AreaPlot } from "@mui/x-charts";
import { MONTHLY_GRAPH_DATA } from "../../../../../constants/mock/api";
import { MONTH_LABELS } from "../../../../../constants/chart";

function LineCard({ activeEmotion }) {
  return (
    <Grid2
      container
      width="100%"
      sx={{ bgcolor: "black", borderRadius: 7, pt: 2, position: "relative" }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", width: "100%" }}
      >
        Daily{" "}
        <span style={{ color: activeEmotion.color }}>
          {activeEmotion.label}
        </span>
      </Typography>
      <LineChart
        width={350}
        height={300}
        series={[
          {
            label: activeEmotion.label,
            color: activeEmotion.color,
            data: activeEmotion.dailyData,
            type: "line",
            showMark: false,
            area: true,
            stack: "total",
          },
        ]}
        slotProps={{
          legend: { hidden: true },
          bottomAxis: { hidden: true },
        }}
        sx={{ position: "absolute", top: -20, left: 0 }}
      >
        <AreaPlot />
      </LineChart>
    </Grid2>
  );
}

export default LineCard;
