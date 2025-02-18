import { Avatar, Badge, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 3.2s infinite ease-in-out",
      border: "1px solid currentColor",
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

function FaveBubble({ conversation_id, avatar_url, full_name, activity, sx }) {
  const isOnlineToday = (lastSignIn) => {
    if (!lastSignIn) return false;
    const now = new Date();
    const signInDate = new Date(lastSignIn);
    const diffInMinutes = (now - signInDate) / (1000 * 60);
    return diffInMinutes <= 60;
  };

  return (
    <>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        invisible={!isOnlineToday(activity)}
      >
        <Avatar
          component={Link}
          to={`/chat/${conversation_id}`}
          alt={full_name}
          src={avatar_url}
          sx={{
            color: "text.primary",
            border: "3px solid #5727C7",
            fontWeight: "normal",
            ":hover": { color: "text.primary" },
            width: 50,
            height: 50,
            ...sx,
          }}
        />
      </StyledBadge>
    </>
  );
}

export default FaveBubble;
