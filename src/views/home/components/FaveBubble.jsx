import { Avatar, Badge } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function FaveBubble({ conversation_id, avatar_url, full_name, activity, sx }) {
  return (
    <>
      <Badge color={activity} overlap="circular" badgeContent=" ">
        <Avatar
          component={Link}
          to={`/chat/${conversation_id}`}
          alt={full_name}
          src={avatar_url}
          sx={{
            color: "text.primary",
            fontWeight: "normal",
            ":hover": { color: "text.primary" },
            width: 60,
            height: 60,
            ...sx,
          }}
        />
      </Badge>
    </>
  );
}

export default FaveBubble;
