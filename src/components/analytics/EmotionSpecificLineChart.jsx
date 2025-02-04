import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React, { useState } from "react";

function EmotionSpecificLineChart({ monthLabels, monthlyEmotions }) {
  const [activeEmotionGraph, setActiveEmotionGraph] = useState("positive");

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ my: 4 }}
    >
      <Typography variant="h6">Emotion specific graph</Typography>
      <Stack direction="row" gap={2} sx={{ p: 5, alignItems: "center" }}>
        <TextField
          select
          sx={{ minWidth: 150 }}
          label="x-axis colorMap"
          value={activeEmotionGraph}
          onChange={(event) => setActiveEmotionGraph(event.target.value)}
        >
          <MenuItem value="positive">Positive</MenuItem>
          <MenuItem value="negative">Negative</MenuItem>
          <MenuItem value="neutral">Neutral</MenuItem>
        </TextField>
        <Typography variant="body1">Pick an emotion category.</Typography>
      </Stack>
      <LineChart
        xAxis={[{ scaleType: "point", data: monthLabels }]}
        series={[monthlyEmotions[activeEmotionGraph]]}
        height={300}
        margin={{ top: 10, bottom: 100 }}
      />
    </Stack>
  );
}

export default EmotionSpecificLineChart;
