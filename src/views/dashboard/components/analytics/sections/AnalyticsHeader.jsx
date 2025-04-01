import React from "react";
import { Grid2, Typography, useTheme } from "@mui/material";
import EmotionMenu from "../menu/EmotionMenu";
function AnalyticsHeader({
  emotionAnalytics,
  activeEmotion,
  setActiveEmotion,
}) {
  const theme = useTheme();
  return (
    <Grid2
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 3,
      }}
    >
      <Typography
        variant="h5"
        color={theme.palette.text.primary}
        sx={{ fontWeight: "bold" }}
      >
        Chat analytics
      </Typography>
      <EmotionMenu
        emotionAnalytics={emotionAnalytics}
        activeEmotion={activeEmotion}
        setActiveEmotion={setActiveEmotion}
      />
    </Grid2>
  );
}

export default AnalyticsHeader;
