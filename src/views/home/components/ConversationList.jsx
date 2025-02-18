import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Stack,
  Skeleton,
  Badge,
  Grid2,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

function ConversationList({ contacts, isLoading }) {
  return isLoading ? (
    <Skeleton
      variant="rectangular"
      height={100}
      width={350}
      sx={{ mt: 5, borderRadius: 3 }}
    />
  ) : (
    <Grid2>
      {contacts.map((contact, index) => (
        <Grid2 key={`conversation-${index}`} container sx={{ my: 4 }}>
          {/* Avatar */}
          <Grid2 size={2}>
            <Avatar
              alt={contact.full_name}
              src={contact.avatar_url}
              slotProps={{ img: { referrerPolicy: "no-referrer" } }}
              sx={{ width: 45, height: 45 }}
            />
          </Grid2>
          {/* Contents */}
          <Grid2
            size={10}
            component={Link}
            to={`/chat/${contact.conversation_id}`}
            sx={{ alignContent: "center" }}
          >
            {/* Name and Date */}
            <Grid2 container size={12} sx={{ justifyContent: "space-between" }}>
              <Typography
                variant="body1"
                sx={{ color: "#5727C7", textAlign: "left", fontWeight: "bold" }}
              >
                {contact.full_name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "left", fontSize: 12 }}
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
                variant="body1"
                sx={{
                  color: "text.secondary",
                  textAlign: "left",
                  fontSize: 12,
                }}
              >
                {contact?.last_message?.content || "No messages yet"}
              </Typography>
              {/* TODO: Add read status (for now, it's read if there is a message) */}
              {contact?.last_message?.content && (
                <Grid2
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#5727C7",
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
