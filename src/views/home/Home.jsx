import { Navigate } from "react-router-dom";

import FaveBubbles from "./components/FaveBubbles";
import ActionButtons from "./components/ActionButtons";
import ConversationList from "./components/ConversationList";
import ContactSearch from "./components/ContactSearch";
import LogoutButton from "../../components/buttons/LogoutButton";

import { useAuth } from "../../auth/AuthContext";
import { useGetContacts } from "../../hooks/useGetContacts";

// import {
//   favouriteContacts,
//   topConversations,
//   userContacts,
// } from "../../constants/mock/api";

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

  console.log(contacts);

  const favoriteContacts =
    contacts?.filter((contact) => contact.is_favorite) || [];

  console.log(favoriteContacts);

  return (
    <>
      <LogoutButton />
      <ActionButtons />
      <FaveBubbles faves={favoriteContacts} />
      <ContactSearch userContacts={contacts} />
      <ConversationList contacts={contacts} isLoading={isLoadingContacts} />
    </>
  );
}

export default Home;
