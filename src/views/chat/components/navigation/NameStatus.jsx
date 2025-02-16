import React from "react";
import { Grid2, Stack, Typography } from "@mui/material";
function NameStatus({ conversationInfo }) {
  return (
    <Grid2
      size={4.8}
      sx={{ zIndex: 1, alignContent: "center", justifyItems: "start" }}
    >
      <Typography
        variant="h6"
        noWrap
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "170px",
          textAlign: "left",
        }}
      >
        {conversationInfo?.full_name}
      </Typography>
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.5)" }}
      >
        Online
      </Typography>
    </Grid2>
  );
}

export default NameStatus;
