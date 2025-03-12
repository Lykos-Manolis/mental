import React from "react";
import { Divider, Typography, Avatar, Skeleton, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";

const avatarSize = 45;

function ConversationList({ contacts, isLoading }) {
  return isLoading ? (
    <Grid2>
      {[...Array(4)].map((_, index) => (
        <Grid2 container sx={{ my: 4 }} spacing={3} key={`skeleton-${index}`}>
          {/* Avatar */}
          <Grid2 size={2}>
            <Skeleton
              variant="circular"
              height={avatarSize}
              width={avatarSize}
            />
          </Grid2>
          {/* Contents */}
          <Grid2 size={10} sx={{ alignContent: "center" }}>
            {/* Name and Date */}
            <Grid2 container size={12} sx={{ justifyContent: "space-between" }}>
              <Skeleton variant="text" height={25} width={100} />
              <Skeleton variant="text" height={25} width={100} />
            </Grid2>
            {/* Message and Read Status */}
            <Grid2 container size={12} sx={{ justifyContent: "space-between" }}>
              <Skeleton variant="text" height={25} width={100} />
              <Skeleton
                variant="circular"
                height={10}
                width={10}
                sx={{ alignSelf: "center" }}
              />
            </Grid2>
          </Grid2>
        </Grid2>
      ))}
    </Grid2>
  ) : (
    <Grid2 sx={{ zIndex: 1 }}>
      {contacts.map((contact, index) => (
        <Grid2
          component={Link}
          to={`/chat/${contact.conversation_id}`}
          key={`conversation-${index}`}
          container
          sx={{ mb: 4 }}
          spacing={3}
        >
          {/* Avatar */}
          <Grid2 size={2}>
            <Avatar
              alt={contact.full_name}
              src={contact.avatar_url?.replace("=s96-c", `=s${avatarSize}-c`)}
              slotProps={{ img: { referrerPolicy: "no-referrer" } }}
              sx={{ width: avatarSize, height: avatarSize }}
            />
          </Grid2>
          {/* Contents */}
          <Grid2 size={10} sx={{ alignContent: "center" }}>
            {/* Name and Date */}
            <Grid2 container size={12} sx={{ justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                {contact.full_name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "left",
                  fontSize: 12,
                  color: "text.secondary",
                }}
              >
                {contact?.last_message
                  ? new Date(
                      contact?.last_message?.created_at,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </Typography>
            </Grid2>
            {/* Message and Read Status */}
            <Grid2 container size={12} sx={{ justifyContent: "space-between" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textAlign: "left",
                }}
              >
                {contact?.last_message?.content || "No messages yet"}
              </Typography>

              {!contact?.is_read && (
                <Grid2
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: "white",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Grid2>
            {/* Divider */}
            <Grid2 size={12} sx={{ mt: 0.5 }}>
              <Divider />
            </Grid2>
          </Grid2>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ConversationList;
