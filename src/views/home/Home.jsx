import {
  Autocomplete,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import FaveBubbles from "./components/FaveBubbles";
import ActionButtons from "./components/ActionButtons";
import { Link } from "react-router-dom";

const contacts = [{ name: "John" }, { name: "Dave" }];
const topConvos = [
  {
    id: 1,
    name: "Jane Doe",
    image: "../src/assets/avatars/avatar_1.jpeg",
    date: "01-05",
    message: "👍🏻",
  },
  {
    id: 1,
    name: "Dave Grohl",
    image: "../src/assets/avatars/avatar_2.jpeg",
    date: "23-02",
    message: "Let's go get some beer this Friday",
  },
  {
    id: 1,
    name: "Sam Smith",
    image: "../src/assets/avatars/avatar_3.jpeg",
    date: "17-09",
    message: "Why don't we go singing bruv?",
  },
];

const faves = [
  {
    id: "1",
    name: "Man Lykos",
    avatar: "../src/assets/avatars/avatar_1.jpeg",
    activity: "success",
  },
  {
    id: "2",
    name: "An Lykos",
    avatar: "../src/assets/avatars/avatar_2.jpeg",
    activity: "error",
  },
  {
    id: "3",
    name: "N Lykos",
    avatar: "../src/assets/avatars/avatar_3.jpeg",
    activity: "error",
  },
  {
    id: "4",
    name: "Lykos",
    avatar: "../src/assets/avatars/avatar_4.jpeg",
    activity: "warning",
  },
];

function Home() {
  return (
    <>
      <ActionButtons />

      <FaveBubbles faves={faves} />
      <Autocomplete
        sx={{ mt: 5 }}
        options={contacts.map((contact) => contact.name)}
        renderInput={(params) => (
          <TextField {...params} size="small" variant="filled" label="Search" />
        )}
      />
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
    </>
  );
}

export default Home;
