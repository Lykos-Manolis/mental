import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import FaveBubbles from "./components/FaveBubbles";
import ActionButtons from "./components/ActionButtons";
import ConversationList from "./components/ConversationList";
import ContactSearch from "./components/ContactSearch";
import LogoutButton from "../../components/buttons/LogoutButton";

import { useAuth } from "../../auth/AuthContext";
import { useGetContacts } from "../../hooks/useGetContacts";
import ContactModal from "./components/ContactModal";
import FavoritesModal from "./components/FavoritesModal";
import { Grid2, IconButton } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeHeader from "./components/HomeHeader";
import Favorites from "./components/Favorites";
import Messages from "./components/Messages";

function Home() {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  const {
    contacts,
    isLoading: isLoadingContacts,
    error: errorContacts,
  } = useGetContacts();

  const [openContactModal, setOpenContactModal] = useState(false);
  const [openFavoritesModal, setOpenFavoritesModal] = useState(false);
  const [favoriteContacts, setFavoriteContacts] = useState(
    contacts?.filter((contact) => contact.is_favorite) || [],
  );

  useEffect(() => {
    setFavoriteContacts(
      contacts?.filter((contact) => contact.is_favorite) || [],
    );
  }, [contacts]);

  return (
    <Grid2
      container
      direction="column"
      spacing={4}
      sx={{
        px: 3,
        bgcolor: "background.default",
        color: "text.primary",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Header */}
      <HomeHeader />

      {/* Favorites */}
      <Favorites favoriteContacts={favoriteContacts} />

      {/* TODO: Add or delete search bar */}
      {/* <ContactSearch userContacts={contacts} /> */}

      {/* Messages */}
      <Messages contacts={contacts} isLoadingContacts={isLoadingContacts} />

      {/* Action Buttons */}
      <ActionButtons
        onOpenContactModal={() => setOpenContactModal(true)}
        onOpenFavoritesModal={() => setOpenFavoritesModal(true)}
      />

      <ContactModal
        open={openContactModal}
        onClose={() => setOpenContactModal(false)}
      />
      <FavoritesModal
        open={openFavoritesModal}
        onClose={() => setOpenFavoritesModal(false)}
        favoriteContacts={favoriteContacts}
        setFavoriteContacts={setFavoriteContacts}
        contacts={contacts}
      />
    </Grid2>
  );
}

export default Home;
