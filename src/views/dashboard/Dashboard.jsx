import { Grid2 } from "@mui/material";
import React from "react";
import DashboardNav from "./components/navigation/DashboardNav";
import DashboardInfo from "./components/information/DashboardInfo";
import Analytics from "./components/analytics/Analytics";

function Dashboard() {
  return (
    <Grid2
      container
      direction="column"
      wrap="nowrap"
      sx={{
        width: "100vw",
        height: "100vh",
        p: 4,
        pt: 10,
      }}
    >
      <DashboardNav />
      <DashboardInfo />
      <Analytics />
      <svg
        id="visual"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <defs>
          <filter id="blur1" x="-10%" y="-10%">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="140"
              result="effect1_foregroundBlur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#ff0055" opacity="0"></rect>
        <g filter="url(#blur1)">
          <circle cx="65" cy="418" fill="#000000" r="310"></circle>
          <circle cx="303" cy="245" fill="#ff0055" r="310"></circle>
          <circle cx="170" cy="592" fill="#000000" r="310"></circle>
          <circle cx="232" cy="751" fill="#000000" r="310"></circle>
          <circle cx="260" cy="400" fill="#ff0055" r="310"></circle>
          <circle cx="67" cy="204" fill="#000000" r="310"></circle>
        </g>
      </svg>
    </Grid2>
  );
}

export default Dashboard;
