import { Avatar, Badge, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledBadge from "../../../components/styled/StyledBadge";
import { useOnlineStatus } from "../../../hooks/useOnlineStatus";

function FaveBubble({
  conversation_id,
  avatar_url,
  full_name,
  last_sign_in,
  sx,
}) {
  const isOnline = useOnlineStatus(last_sign_in);

  return (
    <>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        isonline={isOnline.toString()}
        invisible={!isOnline}
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
