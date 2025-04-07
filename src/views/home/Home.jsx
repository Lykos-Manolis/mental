import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ConversationList from "./components/ConversationList";

import { useAuth } from "../../auth/AuthContext";
import { useGetContacts } from "../../hooks/useGetContacts";
import ContactModal from "./components/ContactModal";
import FavoritesModal from "./components/FavoritesModal";
import { Grid2, useTheme } from "@mui/material";
import HomeHeader from "./components/HomeHeader";
import Favorites from "./components/Favorites";
import anime from "animejs";
import SideDrawer from "./components/SideDrawer";
import WelcomeModal from "./components/WelcomeModal";
import { checkMasterKeys, getMasterKey } from "../../utils/indexedDB";
import { useGetUserId } from "../../hooks/useGetUserId";
import { decryptMessage } from "../../utils/encryption";

function Home() {
  const { session } = useAuth();
  const theme = useTheme();
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const userId = useGetUserId();

  const handleWelcomeModalClose = () => {
    setWelcomeModalOpen(false);
  };

  const {
    decryptedContacts: contacts,
    isLoading: isLoadingContacts,
    error: errorContacts,
  } = useGetContacts(userId);

  const [openContactModal, setOpenContactModal] = useState(false);
  const [openFavoritesModal, setOpenFavoritesModal] = useState(false);
  const [favoriteContacts, setFavoriteContacts] = useState(
    contacts?.filter((contact) => contact.is_favorite) || [],
  );

  // Check if it's the first visit when component mounts
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setWelcomeModalOpen(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  // Update favorite contacts
  useEffect(() => {
    setFavoriteContacts(
      contacts?.filter((contact) => contact.is_favorite) || [],
    );
  }, [contacts]);

  // Update SVG paths
  useEffect(() => {
    if (contacts && contacts.length > 0) {
      anime({
        targets: "#svg-path-1",
        fill: theme.palette.emotion[
          contacts[0]?.last_message?.emotion || "default"
        ],
        duration: 3000,
        easing: "easeOutElastic",
      });
      anime({
        targets: "#svg-path-2",
        fill: theme.palette.emotion[
          contacts[1]?.last_message?.emotion || "default"
        ],
        duration: 3000,
        easing: "easeOutElastic",
      });
      anime({
        targets: "#svg-path-3",
        fill: theme.palette.emotion[
          contacts[2]?.last_message?.emotion || "default"
        ],
        duration: 3000,
        easing: "easeOutElastic",
      });
      anime({
        targets: "#svg-path-4",
        fill: theme.palette.emotion[
          contacts[3]?.last_message?.emotion || "default"
        ],
        duration: 3000,
        easing: "easeOutElastic",
      });
      anime({
        targets: "#svg-path-5",
        fill: theme.palette.emotion[
          contacts[4]?.last_message?.emotion || "default"
        ],
        duration: 3000,
        easing: "easeOutElastic",
      });
    }
  }, [contacts, theme]);

  if (!session) {
    return <Navigate to="/" replace />;
  }

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
        onOpenWelcomeModal={() => setWelcomeModalOpen(true)}
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

      <WelcomeModal open={welcomeModalOpen} onClose={handleWelcomeModalClose} />

      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          pointerEvents: "none",
          objectFit: "cover",
          objectPosition: "top",
          overflow: "hidden",
          width: "400px",
          height: "900px",
        }}
      >
        <path
          id="svg-path-5"
          d="M405 405C351.8 399.9 298.5 394.9 250 374.2C201.5 353.5 157.7 317.2 129.9 275.1C102.2 232.9 90.5 185 71.5 138.1C52.5 91.3 26.2 45.7 0 0H405V405Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
        <path
          id="svg-path-4"
          d="M405 324C362.4 319.9 319.8 315.9 281 299.3C242.2 282.8 207.2 253.8 184.9 220.1C162.7 186.3 153.4 148 138.2 110.5C123 73.1 102 36.5 81 0H405V324Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
        <path
          id="svg-path-3"
          d="M405 243C373.1 240 341.1 236.9 312 224.5C282.9 212.1 256.6 190.3 240 165C223.3 139.8 216.3 111 204.9 82.9C193.5 54.8 177.7 27.4 162 0H405V243Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
        <path
          id="svg-path-2"
          d="M405 162C383.7 160 362.4 157.9 343 149.7C323.6 141.4 306.1 126.9 295 110C283.9 93.2 279.2 74 271.6 55.3C264 36.5 253.5 18.3 243 0H405V162Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
        <path
          id="svg-path-1"
          d="M405 81C394.4 80 383.7 79 374 74.8C364.3 70.7 355.5 63.4 350 55C344.4 46.6 342.1 37 338.3 27.6C334.5 18.3 329.2 9.1 324 0H405V81Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
      </svg>
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          pointerEvents: "none",
          objectFit: "cover",
          objectPosition: "left",
          overflow: "hidden",
          width: "100%",
          height: "400px",
        }}
      >
        <path
          id="svg-path-5"
          d="M0 0C42.7 30.1 85.3 60.2 136.6 75.2C187.9 90.2 247.8 90.2 286.4 118.6C325 147.1 342.2 204 358.5 256.5C374.7 309 389.8 357 405 405H0V0Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
        <path
          id="svg-path-4"
          d="M0 81C34.1 105.1 68.3 129.1 109.3 141.1C150.3 153.2 198.2 153.1 229.1 175.9C260 198.7 273.8 244.2 286.8 286.2C299.7 328.2 311.9 366.6 324 405H0V81Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
        <path
          id="svg-path-3"
          d="M0 162C25.6 180 51.2 198.1 82 207.1C112.7 216.1 148.7 216.1 171.8 233.2C195 250.2 205.3 284.4 215.1 315.9C224.8 347.4 233.9 376.2 243 405H0V162Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
        <path
          id="svg-path-2"
          d="M0 243C17.1 255 34.1 267.1 54.6 273.1C75.2 279.1 99.1 279.1 114.6 290.4C130 301.8 136.9 324.6 143.4 345.6C149.9 366.6 155.9 385.8 162 405H0V243Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
        <path
          id="svg-path-1"
          d="M0 324C8.5 330 17.1 336 27.3 339C37.6 342 49.6 342 57.3 347.7C65 353.4 68.4 364.8 71.7 375.3C74.9 385.8 78 395.4 81 405H0V324Z"
          fill={theme.palette.background.default}
          opacity={0.5}
        />
      </svg>
    </Grid2>
  );
}

export default Home;
