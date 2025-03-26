import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ConversationList from "./components/ConversationList";

import { useAuth } from "../../auth/AuthContext";
import { useGetContacts } from "../../hooks/useGetContacts";
import ContactModal from "./components/ContactModal";
import FavoritesModal from "./components/FavoritesModal";
import { Grid2 } from "@mui/material";
import HomeHeader from "./components/HomeHeader";
import Favorites from "./components/Favorites";
import anime from "animejs";
import { EMOTION_COLORS } from "../../constants/emotions";
import SideDrawer from "./components/SideDrawer";

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

  useEffect(() => {
    if (contacts && contacts.length > 0) {
      anime({
        targets: "#svg-path-1",
        fill: EMOTION_COLORS[contacts[0]?.last_message?.emotion] || "#fa7268",
        duration: 3000,
        easing: "easeOutElastic",
      });
      anime({
        targets: "#svg-path-2",
        fill: EMOTION_COLORS[contacts[1]?.last_message?.emotion] || "#ef5f67",
        duration: 3000,
        easing: "easeOutElastic",
      });
      anime({
        targets: "#svg-path-3",
        fill: EMOTION_COLORS[contacts[2]?.last_message?.emotion] || "#e34c67",
        duration: 3000,
        easing: "easeOutElastic",
      });
      anime({
        targets: "#svg-path-4",
        fill: EMOTION_COLORS[contacts[3]?.last_message?.emotion] || "#d53867",
        duration: 3000,
        easing: "easeOutElastic",
      });
      anime({
        targets: "#svg-path-5",
        fill: EMOTION_COLORS[contacts[4]?.last_message?.emotion] || "#c62368",
        duration: 3000,
        easing: "easeOutElastic",
      });
    }
  }, [contacts]);

  return (
    <Grid2
      container
      direction="column"
      spacing={7}
      sx={{
        px: 4,
        pt: 6,
        bgcolor: "background.default",
        backgroundImage: "url(/svg/home.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "text.primary",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Header */}
      <HomeHeader />

      {/* Favorites */}
      <Favorites
        favoriteContacts={favoriteContacts}
        favoritesLoading={isLoadingContacts}
      />

      {/* Messages */}
      <ConversationList contacts={contacts} isLoading={isLoadingContacts} />

      <SideDrawer
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
      <svg
        id="visual"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 393 852"
        width="393"
        height="852"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <path
          id="svg-path-1"
          d="M0 599L9.3 599.5C18.7 600 37.3 601 56 592.5C74.7 584 93.3 566 112 571C130.7 576 149.3 604 168.2 604.7C187 605.3 206 578.7 224.8 559.5C243.7 540.3 262.3 528.7 281 530.8C299.7 533 318.3 549 337 564.7C355.7 580.3 374.3 595.7 383.7 603.3L393 611L393 853L383.7 853C374.3 853 355.7 853 337 853C318.3 853 299.7 853 281 853C262.3 853 243.7 853 224.8 853C206 853 187 853 168.2 853C149.3 853 130.7 853 112 853C93.3 853 74.7 853 56 853C37.3 853 18.7 853 9.3 853L0 853Z"
          fill="#fa7268"
        ></path>
        <path
          id="svg-path-2"
          d="M0 658L9.3 661.7C18.7 665.3 37.3 672.7 56 660C74.7 647.3 93.3 614.7 112 598.8C130.7 583 149.3 584 168.2 589.3C187 594.7 206 604.3 224.8 606.2C243.7 608 262.3 602 281 608.7C299.7 615.3 318.3 634.7 337 629.2C355.7 623.7 374.3 593.3 383.7 578.2L393 563L393 853L383.7 853C374.3 853 355.7 853 337 853C318.3 853 299.7 853 281 853C262.3 853 243.7 853 224.8 853C206 853 187 853 168.2 853C149.3 853 130.7 853 112 853C93.3 853 74.7 853 56 853C37.3 853 18.7 853 9.3 853L0 853Z"
          fill="#ef5f67"
        ></path>
        <path
          id="svg-path-3"
          d="M0 639L9.3 643.2C18.7 647.3 37.3 655.7 56 656.2C74.7 656.7 93.3 649.3 112 646.7C130.7 644 149.3 646 168.2 649.8C187 653.7 206 659.3 224.8 665.7C243.7 672 262.3 679 281 674C299.7 669 318.3 652 337 653.7C355.7 655.3 374.3 675.7 383.7 685.8L393 696L393 853L383.7 853C374.3 853 355.7 853 337 853C318.3 853 299.7 853 281 853C262.3 853 243.7 853 224.8 853C206 853 187 853 168.2 853C149.3 853 130.7 853 112 853C93.3 853 74.7 853 56 853C37.3 853 18.7 853 9.3 853L0 853Z"
          fill="#e34c67"
        ></path>
        <path
          id="svg-path-4"
          d="M0 762L9.3 756.8C18.7 751.7 37.3 741.3 56 735.7C74.7 730 93.3 729 112 729.3C130.7 729.7 149.3 731.3 168.2 729.8C187 728.3 206 723.7 224.8 729.8C243.7 736 262.3 753 281 755.2C299.7 757.3 318.3 744.7 337 744.5C355.7 744.3 374.3 756.7 383.7 762.8L393 769L393 853L383.7 853C374.3 853 355.7 853 337 853C318.3 853 299.7 853 281 853C262.3 853 243.7 853 224.8 853C206 853 187 853 168.2 853C149.3 853 130.7 853 112 853C93.3 853 74.7 853 56 853C37.3 853 18.7 853 9.3 853L0 853Z"
          fill="#d53867"
        ></path>
        <path
          id="svg-path-5"
          d="M0 801L9.3 802.2C18.7 803.3 37.3 805.7 56 804.3C74.7 803 93.3 798 112 798C130.7 798 149.3 803 168.2 796.7C187 790.3 206 772.7 224.8 765.8C243.7 759 262.3 763 281 761.3C299.7 759.7 318.3 752.3 337 755.8C355.7 759.3 374.3 773.7 383.7 780.8L393 788L393 853L383.7 853C374.3 853 355.7 853 337 853C318.3 853 299.7 853 281 853C262.3 853 243.7 853 224.8 853C206 853 187 853 168.2 853C149.3 853 130.7 853 112 853C93.3 853 74.7 853 56 853C37.3 853 18.7 853 9.3 853L0 853Z"
          fill="#c62368"
        ></path>
      </svg>
    </Grid2>
  );
}

export default Home;
