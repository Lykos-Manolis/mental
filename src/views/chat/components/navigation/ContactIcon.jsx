import React from "react";
import { Grid2, Badge, styled, Avatar } from "@mui/material";
import StyledBadge from "../../../../components/styled/StyledBadge";

function ContactIcon({ conversationInfo, isOnline }) {
  return (
    <Grid2>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        sx={{ mx: 2 }}
        isonline={isOnline.toString()}
      >
        <Avatar
          sx={{ border: "2px solid white" }}
          alt={conversationInfo?.full_name}
          src={conversationInfo?.avatar_url}
        />
      </StyledBadge>
    </Grid2>
  );
}

export default ContactIcon;
