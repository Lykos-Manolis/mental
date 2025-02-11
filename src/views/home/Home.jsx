import { useState } from "react";
import { Navigate } from "react-router-dom";

import FaveBubbles from "./components/FaveBubbles";
import ActionButtons from "./components/ActionButtons";
import ConversationList from "./components/ConversationList";
import ContactSearch from "./components/ContactSearch";
import LogoutButton from "../../components/buttons/LogoutButton";

import { useAuth } from "../../auth/AuthContext";
import { useGetContacts } from "../../hooks/useGetContacts";
import ContactModal from "./components/ContactModal";

function Home() {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  const [openContactModal, setOpenContactModal] = useState(false);

  const {
    contacts,
    isLoading: isLoadingContacts,
    error: errorContacts,
  } = useGetContacts();

  const favoriteContacts =
    contacts?.filter((contact) => contact.is_favorite) || [];

  return (
    <>
      <LogoutButton />
      <ActionButtons onOpenContactModal={() => setOpenContactModal(true)} />
      <FaveBubbles faves={favoriteContacts} />
      <ContactSearch userContacts={contacts} />
      <ConversationList contacts={contacts} isLoading={isLoadingContacts} />
      <ContactModal
        open={openContactModal}
        onClose={() => setOpenContactModal(false)}
      />
    </>
  );
}

export default Home;
