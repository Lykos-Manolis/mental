import React, { useState } from "react";
import {
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import FaceIcon from "@mui/icons-material/Face";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useAuth } from "../../../auth/AuthContext";

function SideDrawer({ onOpenContactModal, onOpenFavoritesModal }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const { signOut } = useAuth();

  return (
    <Grid2
      size={12}
      container
      sx={{
        alignItems: "center",
        mt: 4,
        zIndex: 1,
        position: "relative",
        width: "100%",
      }}
    >
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        disableSwipeToOpen={false}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Grid2
          sx={{
            backgroundColor: "background.default",
            height: "100%",
            width: "100%",
            borderRight: "2px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <List sx={{ mt: 6, px: 1 }}>
            <ListItem key="profile">
              <ListItemButton>
                <ListItemIcon>
                  <FaceIcon sx={{ color: "lightblue" }} />
                </ListItemIcon>
                <ListItemText primary="Profile" sx={{ color: "lightblue" }} />
              </ListItemButton>
            </ListItem>

            <ListItem key="addContact">
              <ListItemButton
                aria-label="add contact"
                onClick={onOpenContactModal}
              >
                <ListItemIcon>
                  <AddReactionIcon sx={{ color: "#A1FFE5" }} />
                </ListItemIcon>
                <ListItemText primary="Add Contact" sx={{ color: "#A1FFE5" }} />
              </ListItemButton>
            </ListItem>

            <ListItem
              key="favorites"
              aria-label="add to favorites"
              onClick={onOpenFavoritesModal}
            >
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteBorderIcon sx={{ color: "pink" }} />
                </ListItemIcon>
                <ListItemText primary="Favorites" sx={{ color: "pink" }} />
              </ListItemButton>
            </ListItem>

            <ListItem key="settings">
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: "gray" }} />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ color: "gray" }} />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem key="theme">
              <ListItemButton>
                <ListItemIcon>
                  <LightModeIcon sx={{ color: "#FFCAA4" }} />
                </ListItemIcon>
                <ListItemText primary="Light Mode" sx={{ color: "#FFCAA4" }} />
              </ListItemButton>
            </ListItem>

            <ListItem key="logout">
              <ListItemButton aria-label="logout" onClick={signOut}>
                <ListItemIcon>
                  <ExitToAppIcon sx={{ color: "#FD8A8A" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: "#FD8A8A" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid2>
      </SwipeableDrawer>
    </Grid2>
  );
}

export default SideDrawer;
