import React from "react";
import { Grid2 } from "@mui/material";
import DashboardInfoBlock from "./DashboardInfoBlock";
import ContactIcon from "../../../../components/profile/ContactIcon";

const avatarSize = 48;

function DashboardInfo({ totalMessages }) {
  const isOnline = true;
  const conversationInfo = {
    full_name: "Jasmine Davinson",
    avatar_url: "",
  };

  return (
    <Grid2
      container
      sx={{ justifyContent: "space-evenly", width: "100%", mb: 5, zIndex: 1 }}
    >
      <DashboardInfoBlock title="Messages" value={totalMessages} text="Total" />
      <ContactIcon
        conversationInfo={conversationInfo}
        isOnline={isOnline}
        avatarSize={avatarSize}
      />
      <DashboardInfoBlock title="Duration" value={12} text="Days" />
    </Grid2>
  );
}

export default DashboardInfo;
