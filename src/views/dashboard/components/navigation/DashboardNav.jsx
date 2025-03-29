import React from "react";
import { Grid2, Typography, IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

function DashboardNav({ conversationInfo }) {
  const { dashboardId: chatId } = useParams();

  return (
    <Grid2
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative",
        mb: 3,
        zIndex: 1,
      }}
    >
      <IconButton
        sx={{ position: "absolute", left: "5%" }}
        aria-label="back"
        component={Link}
        to={`/chat/${chatId}`}
      >
        <KeyboardDoubleArrowLeftIcon
          sx={{
            color: "white",
          }}
        />
      </IconButton>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {conversationInfo?.full_name}
      </Typography>
    </Grid2>
  );
}

export default DashboardNav;
