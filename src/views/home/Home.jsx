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

function Home() {
  const { session } = useAuth();
  const theme = useTheme();

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
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          objectFit: "cover",
          objectPosition: "bottom",
          overflow: "hidden",
        }}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <defs>
          <linearGradient id="grad1_0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#fbae3c" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#fbae3c" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad1_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#fbae3c" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#c07c00" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad1_2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#874d00" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#c07c00" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad1_3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#874d00" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#552100" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad1_4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#000000" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#552100" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2_0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#fbae3c" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#fbae3c" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#c07c00" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#fbae3c" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2_2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#c07c00" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#874d00" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2_3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#552100" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#874d00" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2_4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#552100" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#000000" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <g transform="translate(450, 0)">
          <path
            id="svg-path-5"
            d="M0 405C-55.9 402.6 -111.8 400.3 -155 374.2C-198.2 348.1 -228.7 298.3 -256 256C-283.3 213.7 -307.4 178.8 -331.7 137.4C-356 96 -380.5 48 -405 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
          <path
            id="svg-path-4"
            d="M0 324C-44.7 322.1 -89.4 320.2 -124 299.3C-158.5 278.5 -182.9 238.6 -204.8 204.8C-226.6 170.9 -245.9 143 -265.3 109.9C-284.8 76.8 -304.4 38.4 -324 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
          <path
            id="svg-path-3"
            d="M0 243C-33.5 241.6 -67.1 240.2 -93 224.5C-118.9 208.9 -137.2 179 -153.6 153.6C-170 128.2 -184.4 107.3 -199 82.4C-213.6 57.6 -228.3 28.8 -243 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
          <path
            id="svg-path-2"
            d="M0 162C-22.4 161.1 -44.7 160.1 -62 149.7C-79.3 139.2 -91.5 119.3 -102.4 102.4C-113.3 85.5 -122.9 71.5 -132.7 55C-142.4 38.4 -152.2 19.2 -162 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
          <path
            id="svg-path-1"
            d="M0 81C-11.2 80.5 -22.4 80.1 -31 74.8C-39.6 69.6 -45.7 59.7 -51.2 51.2C-56.7 42.7 -61.5 35.8 -66.3 27.5C-71.2 19.2 -76.1 9.6 -81 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
        </g>
        <g transform="translate(0, 950)">
          <path
            id="svg-path-5"
            d="M0 -405C58.7 -405.7 117.5 -406.4 155 -374.2C192.5 -342 208.8 -276.8 233.3 -233.3C257.9 -189.9 290.6 -168.1 320.6 -132.8C350.6 -97.5 377.8 -48.8 405 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
          <path
            id="svg-path-4"
            d="M0 -324C47 -324.6 94 -325.1 124 -299.3C154 -273.6 167.1 -221.5 186.7 -186.7C206.3 -151.9 232.5 -134.5 256.5 -106.2C280.5 -78 302.2 -39 324 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
          <path
            id="svg-path-3"
            d="M0 -243C35.2 -243.4 70.5 -243.8 93 -224.5C115.5 -205.2 125.3 -166.1 140 -140C154.7 -113.9 174.4 -100.8 192.4 -79.7C210.3 -58.5 226.7 -29.3 243 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
          <path
            id="svg-path-2"
            d="M0 -162C23.5 -162.3 47 -162.6 62 -149.7C77 -136.8 83.5 -110.7 93.3 -93.3C103.1 -76 116.2 -67.2 128.2 -53.1C140.2 -39 151.1 -19.5 162 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
          <path
            id="svg-path-1"
            d="M0 -81C11.7 -81.1 23.5 -81.3 31 -74.8C38.5 -68.4 41.8 -55.4 46.7 -46.7C51.6 -38 58.1 -33.6 64.1 -26.6C70.1 -19.5 75.6 -9.8 81 0L0 0Z"
            fill={theme.palette.background.default}
            opacity={0.5}
          ></path>
        </g>
      </svg>
    </Grid2>
  );
}

export default Home;
