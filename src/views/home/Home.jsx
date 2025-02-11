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
    <>
      <LogoutButton />
      <ActionButtons
        onOpenContactModal={() => setOpenContactModal(true)}
        onOpenFavoritesModal={() => setOpenFavoritesModal(true)}
      />
      <FaveBubbles faves={favoriteContacts} />
      <ContactSearch userContacts={contacts} />
      <ConversationList contacts={contacts} isLoading={isLoadingContacts} />
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
    </>
  );
}

export default Home;
