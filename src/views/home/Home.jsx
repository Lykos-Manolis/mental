import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import FaveBubbles from "./components/FaveBubbles";
import ActionButtons from "./components/ActionButtons";
import ConversationList from "./components/ConversationList";
import ContactSearch from "./components/ContactSearch";

import {
  favouriteContacts,
  topConversations,
  userContacts,
} from "../../constants/mock/api";

function Home() {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/unauthorized" replace />;
  }
  return (
    <>
      <ActionButtons />
      <FaveBubbles faves={favouriteContacts} />
      <ContactSearch userContacts={userContacts} />
      <ConversationList topConvos={topConversations} />
    </>
  );
}

export default Home;
