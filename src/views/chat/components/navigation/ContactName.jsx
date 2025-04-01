import React from "react";
import { Grid2, Stack, Typography } from "@mui/material";
function ContactName({ conversationInfo }) {
  return (
    <Grid2>
      <Typography variant="body1" color="text.primary" noWrap>
        {conversationInfo?.full_name}
      </Typography>
    </Grid2>
  );
}

export default ContactName;
