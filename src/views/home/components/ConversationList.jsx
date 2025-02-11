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
} from "@mui/material";
import { Link } from "react-router-dom";

function ConversationList({ contacts, isLoading }) {
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
              <Avatar
                alt={contact.full_name}
                src={contact.avatar_url}
                slotProps={{ img: { referrerPolicy: "no-referrer" } }}
              />
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
                    {new Date(
                      contact.last_message.created_at,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                  {" — " + contact.last_message.content}
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
