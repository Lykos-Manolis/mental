import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

function ConversationList({ topConvos }) {
  return (
    <List
      sx={{
        mt: 5,
        width: "100%",
        maxWidth: 360,
        bgcolor: "black",
        borderRadius: 5,
      }}
    >
      {topConvos.map((convo, index) => (
        <div key={`fav-convo-${index}`}>
          <ListItem
            component={Link}
            to={`/chat/${convo.id}`}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt={convo.name} src={convo.image} />
            </ListItemAvatar>
            <ListItemText
              primary={convo.name}
              sx={{ color: "text.primary" }}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary", display: "inline" }}
                  >
                    {convo.date}
                  </Typography>
                  {" — " + convo.message}
                </>
              }
            />
          </ListItem>
          {index < topConvos.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </div>
      ))}
    </List>
  );
}

export default ConversationList;
