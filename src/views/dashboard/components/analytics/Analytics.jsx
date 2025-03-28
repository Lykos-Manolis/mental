import React from "react";
import { Grid2 } from "@mui/material";
import AnalyticsHeader from "./sections/AnalyticsHeader";
import AnalyticsBody from "./sections/AnalyticsBody";

function Analytics({
  emotionAnalytics,
  activeEmotion,
  setActiveEmotion,
  totalMessages,
  prevailingEmotion,
  underlyingEmotion,
  monthlyData,
}) {
  return (
    <Grid2 container sx={{ zIndex: 1 }}>
      <AnalyticsHeader
        emotionAnalytics={emotionAnalytics}
        activeEmotion={activeEmotion}
        setActiveEmotion={setActiveEmotion}
      />
      <AnalyticsBody
        activeEmotion={activeEmotion}
        totalMessages={totalMessages}
        prevailingEmotion={prevailingEmotion}
        underlyingEmotion={underlyingEmotion}
        monthlyData={monthlyData}
      />
    </Grid2>
  );
}

export default Analytics;
