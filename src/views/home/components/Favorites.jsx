import React from "react";
import { Grid2, Skeleton } from "@mui/material";
import Heading from "../../../components/typography/Heading";
import FaveBubbles from "./FaveBubbles";

function Favorites({ favoriteContacts, favoritesLoading }) {
  return (
    <Grid2 size={12} sx={{ zIndex: 1 }}>
      {/* <Heading alignment="start" variant="h6" content="Favorites" /> */}
      {favoritesLoading ? (
        <Grid2
          container
          direction="row"
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Skeleton variant="circular" height={70} width={70} />
          <Skeleton variant="circular" height={80} width={80} />
          <Skeleton variant="circular" height={70} width={70} />
        </Grid2>
      ) : (
        <FaveBubbles faves={favoriteContacts} />
      )}
    </Grid2>
  );
}

export default Favorites;
