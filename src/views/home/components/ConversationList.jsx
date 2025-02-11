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
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function ConversationList({ contacts, isLoading }) {
  const isOnlineToday = (lastSignIn) => {
    if (!lastSignIn) return false;
    const now = new Date();
    const signInDate = new Date(lastSignIn);
    const diffInMinutes = (now - signInDate) / (1000 * 60);
    return diffInMinutes <= 60;
  };

  return isLoading ? (
    <Skeleton
      variant="rectangular"
      height={100}
      width={350}
      sx={{ mt: 5, borderRadius: 3 }}
    />
  ) : (
    <List
      sx={{
        mt: 5,
        width: 350,
        maxWidth: 360,
        bgcolor: "black",
        borderRadius: 5,
      }}
    >
      {contacts.map((contact, index) => (
        <Stack key={`conversation-${index}`}>
          <ListItem
            component={Link}
            to={`/chat/${contact.conversation_id}`}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              {isOnlineToday(contact.last_sign_in) ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt={contact.full_name}
                    src={contact.avatar_url}
                    slotProps={{ img: { referrerPolicy: "no-referrer" } }}
                  />
                </StyledBadge>
              ) : (
                <Avatar
                  alt={contact.full_name}
                  src={contact.avatar_url}
                  slotProps={{ img: { referrerPolicy: "no-referrer" } }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={contact.full_name}
              sx={{ color: "text.primary" }}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary", display: "inline" }}
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
                  {contact?.last_message
                    ? " — " + contact?.last_message?.content
                    : "No messages yet"}
                </>
              }
            />
          </ListItem>
          {index < contacts.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </Stack>
      ))}
    </List>
  );
}

export default ConversationList;
