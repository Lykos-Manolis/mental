import React from "react";
import { Grid2, Typography } from "@mui/material";

function DashboardInfoBlock({ title, value, text }) {
  return (
    <Grid2>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {value}
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: "normal",
            color: "white",
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
