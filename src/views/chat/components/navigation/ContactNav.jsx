import React from "react";
import { Grid2, Skeleton } from "@mui/material";
import BackButton from "./BackButton";
import ContactInfo from "./ContactInfo";
import ModalButton from "./ModalButton";

function ContactNav({ conversationInfo, isOnline, toggleDrawer, isLoading }) {
  return isLoading ? (
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
      <Skeleton
        variant="circular"
        height={45}
        width={45}
        sx={{ alignSelf: "center" }}
      />
      <Skeleton
        variant="circular"
        height={36}
        width={36}
        sx={{ alignSelf: "center" }}
      />
    </Grid2>
  ) : (
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
