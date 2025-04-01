import React from "react";
import { Grid2, Typography, useTheme } from "@mui/material";
import PercentageCard from "../cards/PercentageCard";
import PieCard from "../cards/PieCard";
import StatisticCard from "../cards/StatisticCard";
import LineCard from "../cards/LineCard";
import MapCard from "../cards/MapCard";

function AnalyticsBody({
  activeEmotion,
  totalMessages,
  prevailingEmotion,
  underlyingEmotion,
  monthlyData,
}) {
  const theme = useTheme();

  const percentage = Math.round(
    (activeEmotion.totalMessages / totalMessages) * 100,
  );

  return (
    <Grid2
      container
      spacing={0}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid2
        container
        spacing={3}
        sx={{ justifyContent: "center", width: "100%", flexWrap: "nowrap" }}
      >
        <PercentageCard
          percentage={percentage}
          background={
            theme.palette.emotion[activeEmotion.label] ??
            theme.palette.background.default
          }
        />
        <PieCard emotionPercentage={percentage} activeEmotion={activeEmotion} />
      </Grid2>
      <StatisticCard
        prevailingEmotion={prevailingEmotion}
        underlyingEmotion={underlyingEmotion}
      />
      <LineCard activeEmotion={activeEmotion} />
      <MapCard monthlyData={monthlyData} />
    </Grid2>
  );
}

export default AnalyticsBody;
