import React from "react";
import { Stack, Grid2, Avatar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const avatarSize = 62;

function FaveBubbles({ faves }) {
  const theme = useTheme();
  return (
    <Grid2 size={12}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        {faves.map((fave) => (
          <Avatar
            key={fave.id}
            component={Link}
            to={`/chat/${fave.conversation_id}`}
            alt={fave.full_name}
            src={fave.avatar_url?.replace("=s96-c", `=s${avatarSize}-c`)}
            sx={{
              border: `4px solid ${theme.palette.background.contrast}`,
              ":hover": { color: theme.palette.text.primary },
              width: avatarSize,
              height: avatarSize,
            }}
          />
        ))}
      </Stack>
    </Grid2>
  );
}

export default FaveBubbles;
