import React from "react";
import { Grid2, Skeleton } from "@mui/material";
import FaveBubbles from "./FaveBubbles";

function Favorites({ favoriteContacts, favoritesLoading }) {
  return (
    <Grid2 size={12} sx={{ zIndex: 1, mt: 4 }}>
      {favoritesLoading ? (
        <Grid2
          container
          direction="row"
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Skeleton variant="circular" height={70} width={70} />
          <Skeleton variant="circular" height={70} width={70} />
          <Skeleton variant="circular" height={70} width={70} />
          <Skeleton variant="circular" height={70} width={70} />
        </Grid2>
      ) : (
        <FaveBubbles faves={favoriteContacts} />
      )}
    </Grid2>
  );
}

export default Favorites;
