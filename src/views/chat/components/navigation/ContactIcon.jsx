import React from "react";
import { Grid2, Badge, styled, Avatar } from "@mui/material";

// Badge animation for the contact icon
const StyledBadge = styled(Badge)(({ theme, isonline }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: isonline === "true" ? "#44b700" : "#b70000",
    color: isonline === "true" ? "#44b700" : "#b70000",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -2,
      left: -2,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation:
        isonline === "true" ? "ripple 3.2s infinite ease-in-out" : "none",
      border: "2px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "50%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

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
          sx={{ width: 50, height: 50, border: "2px solid white" }}
          alt={conversationInfo?.full_name}
          src={conversationInfo?.avatar_url}
        />
      </StyledBadge>
    </Grid2>
  );
}

export default ContactIcon;
