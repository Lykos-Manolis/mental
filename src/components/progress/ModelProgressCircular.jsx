import React from "react";
import { Grid2, CircularProgress, Typography } from "@mui/material";

function ModelProgressCircular({ modelProgress }) {
  const progress = 30;
  return (
    <Grid2
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        backdropFilter: "blur(10px)",
      }}
    >
      <CircularProgress variant="determinate" value={progress} color="info" />
      {progress < 100 && (
        <Grid2
          container
          justifyContent="space-between"
          sx={{ px: 2, alignSelf: "end" }}
        >
          <Typography fontWeight="bold">Model Progress:</Typography>
          <Typography fontWeight="bold">{progress}%</Typography>
        </Grid2>
      )}
      {progress === 100 && (
        <Typography fontWeight="bold">Model Downloaded</Typography>
      )}
    </Grid2>
  );
}

export default ModelProgressCircular;
