import { Avatar, Badge } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function FaveBubble({ id, avatar, name, activity, sx }) {
  return (
    <>
      <Badge color={activity} overlap="circular" badgeContent=" ">
        <Avatar
          component={Link}
          to={`/chat/${id}`}
          alt={name}
          src={avatar}
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
