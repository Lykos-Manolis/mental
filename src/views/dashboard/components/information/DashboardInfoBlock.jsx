import React from "react";
import { Grid2, Typography, useTheme } from "@mui/material";

function DashboardInfoBlock({ title, value, text }) {
  const theme = useTheme();

  return (
    <Grid2>
      <Typography variant="body2" color={theme.palette.text.primary}>
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={theme.palette.text.primary}
        sx={{ fontWeight: "bold" }}
      >
        {value}
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: "normal",
            color: theme.palette.text.secondary,
            marginLeft: "0.2rem",
          }}
        >
          {text}
        </span>
      </Typography>
    </Grid2>
  );
}

export default DashboardInfoBlock;
