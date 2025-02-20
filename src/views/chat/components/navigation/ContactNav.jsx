import React from "react";
import { Grid2 } from "@mui/material";
import BackButton from "./BackButton";
import ContactInfo from "./ContactInfo";
import ModalButton from "./ModalButton";

function ContactNav({ conversationInfo, isOnline, toggleDrawer }) {
  return (
    <Grid2
      size={12}
      container
      sx={{
        justifyContent: "space-around",
        alignContent: "end",
        height: "15vh",
        zIndex: 1,
      }}
    >
      <BackButton />
      <ContactInfo conversationInfo={conversationInfo} isOnline={isOnline} />
      <ModalButton
        toggleDrawer={toggleDrawer}
        icon="analytics"
        title="View Analytics"
        id="analytics-button"
      />
    </Grid2>
  );
}

export default ContactNav;
