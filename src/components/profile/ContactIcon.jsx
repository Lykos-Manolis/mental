import React from "react";
import { Grid2, Avatar, useTheme } from "@mui/material";
import StyledBadge from "../styled/StyledBadge";

function ContactIcon({ conversationInfo, isOnline, avatarSize }) {
  const theme = useTheme();
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
          sx={{
            border: `2px solid ${theme.palette.background.contrast}`,
            width: avatarSize,
            height: avatarSize,
          }}
          alt={conversationInfo?.full_name}
          src={conversationInfo?.avatar_url?.replace(
            "=s96-c",
            `=s${avatarSize}-c`,
          )}
        />
      </StyledBadge>
    </Grid2>
  );
}

export default ContactIcon;
