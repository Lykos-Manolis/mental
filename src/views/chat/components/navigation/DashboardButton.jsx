import React from "react";
import { Grid2, IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";

function DashboardButton() {
  const { chatId: dashboardId } = useParams();
  return (
    <Grid2>
      <IconButton
        aria-label="back"
        component={Link}
        to={`/dashboard/${dashboardId}`}
      >
        <DataSaverOffIcon
          sx={{
            color: "primary.main",
            bgcolor: "background.contrast",
            borderRadius: "50%",
            p: 0.5,
          }}
        />
      </IconButton>
    </Grid2>
  );
}

export default DashboardButton;
