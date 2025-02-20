import React from "react";
import { Grid2 } from "@mui/material";
import ContactIcon from "./ContactIcon";
import ContactName from "./ContactName";

function ContactInfo({ conversationInfo, isOnline }) {
  return (
    <Grid2 container direction="column" spacing={1}>
      <ContactIcon conversationInfo={conversationInfo} isOnline={isOnline} />
      <ContactName conversationInfo={conversationInfo} />
    </Grid2>
  );
}

export default ContactInfo;
