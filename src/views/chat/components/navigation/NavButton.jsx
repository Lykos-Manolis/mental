import React from "react";
import { Grid2, Tooltip, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

function NavButton({ contactColor, icon, title, id, toggleDrawer }) {
  return (
    <Grid2 size={1} sx={{ zIndex: 1, ml: 3, alignContent: "center" }}>
      <Tooltip title={title}>
        <IconButton id={id} sx={{ opacity: 0.5 }} onClick={toggleDrawer}>
          {icon === "settings" ? <SettingsSuggestIcon /> : <DonutLargeIcon />}
        </IconButton>
      </Tooltip>
    </Grid2>
  );
}

export default NavButton;
