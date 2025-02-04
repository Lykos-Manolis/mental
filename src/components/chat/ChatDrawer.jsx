import { Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EmotionPieChart from "./EmotionPieChart";
import EmotionLineChart from "./EmotionLineChart";
import EmotionSpecificLineChart from "./EmotionSpecificLineChart";

const chartData = [
  { id: 0, value: 73, label: "admiration", color: "rgba(255, 215, 0, 1)" },

  { id: 1, value: 45, label: "amusement", color: "rgba(255, 192, 203, 1)" },
  { id: 2, value: 82, label: "anger", color: "rgba(255, 0, 0, 1)" },
  { id: 3, value: 31, label: "annoyance", color: "rgba(255, 99, 71, 1)" },
  { id: 4, value: 67, label: "approval", color: "rgba(50, 205, 50, 1)" },
  { id: 5, value: 28, label: "caring", color: "rgba(255, 182, 193, 1)" },
];

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlyGraphData = [
  {
    id: "positive",
    label: "Positive",
    color: "green",
    data: [2, 5.5, 2, 8.5, 1.5, 5, 2, null, null, null, 4, 5],
  },
  {
    id: "negative",
    label: "Negative",
    color: "red",
    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, null, 3, 4.5, 2],
  },
  {
    id: "neutral",
    label: "Neutral",
    color: "yellow",
    data: [7, 8, 5, 4, null, null, 2, 5.5, 3, 7, null, null],
  },
];

const monthlyEmotions = {
  positive: {
    id: "positive",
    color: "green",
    data: [2, 5.5, 2, 8.5, 1.5, 5, 2, null, null, null, 4, 5],
  },
  negative: {
    id: "negative",
    color: "red",
    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, null, 3, 4.5, 2],
  },
  neutral: {
    id: "neutral",
    color: "yellow",
    data: [7, 8, 5, 4, null, null, 2, 5.5, 3, 7, null, null],
  },
};

function ChatDrawer({ openDrawer, toggleDrawer }) {
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "100%",
          px: 4,
          py: 2,
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
        },
      }}
      variant="temporary"
      anchor="right"
      open={openDrawer}
    >
      {/* Back button */}
      <Stack direction="row">
        <IconButton onClick={toggleDrawer}>
          <ArrowBackIosIcon sx={{ color: "text.secondary" }} />
        </IconButton>
      </Stack>

      {/* Header */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h3">John Doe</Typography>
        <Typography variant="body1">
          Here we'll display emotion data about your chat
        </Typography>
      </Stack>

      {/* Emotion pie chart */}
      <EmotionPieChart chartData={chartData} />

      <Divider sx={{ my: 2 }} />

      {/* Emotional graph of the month */}
      <EmotionLineChart
        monthLabels={monthLabels}
        monthlyGraphData={monthlyGraphData}
      />

      <Divider sx={{ my: 2 }} />

      {/* Emotion specific graph */}
      <EmotionSpecificLineChart
        monthLabels={monthLabels}
        monthlyEmotions={monthlyEmotions}
      />
    </Drawer>
  );
}

export default ChatDrawer;
