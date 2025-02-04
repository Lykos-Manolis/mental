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
