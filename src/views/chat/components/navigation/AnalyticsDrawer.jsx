import React from "react";
import { Drawer, Stack, Typography, IconButton, Divider } from "@mui/material";
import { ArrowBackIos as ArrowBackIcon } from "@mui/icons-material";
import EmotionPieChart from "../../../../components/analytics/EmotionPieChart";
import EmotionLineChart from "../../../../components/analytics/EmotionLineChart";
import EmotionSpecificLineChart from "../../../../components/analytics/EmotionSpecificLineChart";
import { MONTH_LABELS } from "../../../../constants/chart";
import {
  CHART_DATA,
  MONTHLY_EMOTIONS,
  MONTHLY_GRAPH_DATA,
} from "../../../../constants/mock/api";

function AnalyticsDrawer({ openDrawer, toggleDrawer }) {
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
          <ArrowBackIcon sx={{ color: "text.secondary" }} />
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
      <EmotionPieChart chartData={CHART_DATA} />

      <Divider sx={{ my: 2 }} />

      {/* Emotional graph of the month */}
      <EmotionLineChart
        monthLabels={MONTH_LABELS}
        monthlyGraphData={MONTHLY_GRAPH_DATA}
      />

      <Divider sx={{ my: 2 }} />

      {/* Emotion specific graph */}
      <EmotionSpecificLineChart
        monthLabels={MONTH_LABELS}
        monthlyEmotions={MONTHLY_EMOTIONS}
      />
    </Drawer>
  );
}

export default AnalyticsDrawer;
