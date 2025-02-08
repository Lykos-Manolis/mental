import { Navigate } from "react-router-dom";

import FaveBubbles from "./components/FaveBubbles";
import ActionButtons from "./components/ActionButtons";
import ConversationList from "./components/ConversationList";
import ContactSearch from "./components/ContactSearch";
import LogoutButton from "../../components/buttons/LogoutButton";

import { useAuth } from "../../auth/AuthContext";
import { useGetContacts } from "../../hooks/useGetContacts";

import {
  favouriteContacts,
  topConversations,
  userContacts,
} from "../../constants/mock/api";

function Home() {
  const { session } = useAuth();

  const {
    contacts,
    isLoading: isLoadingContacts,
    error: errorContacts,
  } = useGetContacts();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <LogoutButton />
      <ActionButtons />
      <FaveBubbles faves={favouriteContacts} />
      <ContactSearch userContacts={userContacts} />
      <ConversationList contacts={contacts} isLoading={isLoadingContacts} />
    </>
  );
}

export default Home;
