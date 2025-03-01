import { Grid2, Typography } from "@mui/material";
import React from "react";
import LogoutButton from "../../../components/buttons/LogoutButton";

function HomeHeader() {
  return (
    <Grid2
      size={12}
      container
      sx={{
        alignItems: "center",
        mt: 4,
        zIndex: 1,
        position: "relative",
        width: "100%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          position: "absolute",
          width: "100%",
          textAlign: "center",
        }}
      >
        Mental
      </Typography>
      <LogoutButton />
    </Grid2>
  );
}

export default HomeHeader;
