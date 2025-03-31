import React from "react";
import { Grid2, LinearProgress, Typography } from "@mui/material";

function ModelProgressLinear({ modelProgress }) {
  const progress = modelProgress;
  return (
    <Grid2
      sx={{
        zIndex: 2,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        backdropFilter: "blur(10px)",
      }}
    >
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={progress + 4}
        color="info"
      />
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

export default ModelProgressLinear;
