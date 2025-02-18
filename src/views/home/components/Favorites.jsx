import React from "react";
import { Grid2 } from "@mui/material";
import Heading from "../../../components/typography/Heading";
import FaveBubbles from "./FaveBubbles";

function Favorites({ favoriteContacts }) {
  return (
    <Grid2 size={12}>
      <Heading alignment="start" variant="h6" content="Favorites" />
      <FaveBubbles faves={favoriteContacts} />
    </Grid2>
  );
}

export default Favorites;
