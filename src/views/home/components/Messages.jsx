import React from "react";
import { Grid2 } from "@mui/material";
import Heading from "../../../components/typography/Heading";
import ConversationList from "./ConversationList";

function Messages({ contacts, isLoadingContacts }) {
  return (
    <Grid2 size={12} sx={{ zIndex: 1 }}>
      {/* <Heading alignment="start" variant="h6" content="Messages" /> */}
      <ConversationList contacts={contacts} isLoading={isLoadingContacts} />
    </Grid2>
  );
}

export default Messages;
