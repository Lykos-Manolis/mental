import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import ActionButtons from "./components/ActionButtons";

import { useAuth } from "../../auth/AuthContext";
import { useGetContacts } from "../../hooks/useGetContacts";
import ContactModal from "./components/ContactModal";
import FavoritesModal from "./components/FavoritesModal";
import { Grid2 } from "@mui/material";
import HomeHeader from "./components/HomeHeader";
import Favorites from "./components/Favorites";
import Messages from "./components/Messages";
import anime from "animejs";
import { EMOTION_COLORS } from "../../constants/emotions";
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
    anime({
      targets: "#shape-size-1",
      translateY: [5, -5],
      duration: 4000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });
    anime({
      targets: "#shape-path-1 stop",
      stopColor: EMOTION_COLORS[contacts[0]?.last_message?.emotion],
      duration: 3000,
      easing: "easeOutElastic",
    });

    anime({
      targets: "#shape-size-2",
      width: ["100", "108"],
      height: ["100", "108"],
      duration: 2000,
      loop: true,
      direction: "alternate",
      easing: "easeOutElastic",
    });
    anime({
      targets: "#shape-path-2",
      translateY: [5, -5],
      duration: 2000,
      loop: true,
      direction: "alternate",
      easing: "easeOutElastic",
    });
    anime({
      targets: "#shape-path-2 stop",
      stopColor: EMOTION_COLORS[contacts[1]?.last_message?.emotion],
      duration: 3000,
      easing: "easeOutElastic",
      delay: 500,
    });

    anime({
      targets: "#shape-size-3",
      translateY: [-5, 5],
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });
    anime({
      targets: "#shape-path-3",
      translateY: [5, -5],
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });
    anime({
      targets: "#shape-path-3 stop",
      stopColor: EMOTION_COLORS[contacts[2]?.last_message?.emotion],
      duration: 3000,
      easing: "easeOutElastic",
      delay: 1000,
    });

    anime({
      targets: "#shape-size-4",
      translateY: [-5, 5],
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
      delay: 1000,
    });
    anime({
      targets: "#shape-path-4",
      translateY: [5, -5],
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
      delay: 1000,
    });
    anime({
      targets: "#shape-path-4 stop",
      stopColor: EMOTION_COLORS[contacts[3]?.last_message?.emotion],
      duration: 3000,
      easing: "easeOutElastic",
      delay: 1300,
    });

    anime({
      targets: "#shape-size-5",
      translateY: [-5, 5],
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
      delay: 2000,
    });
    anime({
      targets: "#shape-path-5",
      translateY: [-5, 5],
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
      delay: 2000,
    });
    anime({
      targets: "#shape-path-5 stop",
      stopColor: EMOTION_COLORS[contacts[4]?.last_message?.emotion],
      duration: 3000,
      easing: "easeOutElastic",
      delay: 1500,
    });
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

      {/* TODO: Add contrast to the text */}

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

      <svg
        id="shape-size-1"
        style={{
          position: "absolute",
          bottom: -15,
          right: 0,
          width: "100vw",
          height: "auto",
          preserveAspectRatio: "xMidYMax meet",
          zIndex: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 392 548"
        preserveAspectRatio="xMidYMax meet"
      >
        <path
          fill="url(#shape-path-1)"
          d="M302.389 273.098C370.874 223.05 390.665 70.179 392 0v548H-10v-72.786c27.534 27.27 93.79 51.612 161 18.286 92.817-46.024 65.782-157.842 151.389-220.402Z"
        />
        <defs>
          <radialGradient
            id="shape-path-1"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="rotate(77.158 60.54 225.045) scale(436.416 423.647)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#808080" stopOpacity=".55" />
            <stop offset="1" stopColor="#808080" stopOpacity=".15" />
          </radialGradient>
        </defs>
      </svg>

      <svg
        id="shape-size-2"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        fill="none"
        viewBox="0 0 92 82"
      >
        <circle cx="74" cy="8" r="74" fill="url(#shape-path-2)" />
        <defs>
          <linearGradient
            id="shape-path-2"
            x1="104"
            x2="69.5"
            y1="-6"
            y2="108"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#808080" stopOpacity=".15" />
            <stop offset="1" stopColor="#808080" stopOpacity=".55" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        id="shape-size-3"
        style={{ position: "absolute", top: 65, right: 140, zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="72"
        fill="none"
        viewBox="0 0 62 62"
      >
        <circle cx="31" cy="31" r="31" fill="url(#shape-path-3)" />
        <defs>
          <linearGradient
            id="shape-path-3"
            x1="66.5"
            x2="31"
            y1="-10"
            y2="62"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#808080" stopOpacity=".15" />
            <stop offset="1" stopColor="#808080" stopOpacity=".55" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        id="shape-size-4"
        style={{ position: "absolute", top: 25, right: 107, zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        fill="none"
        viewBox="0 0 30 30"
      >
        <circle cx="11" cy="11" r="11" fill="url(#shape-path-4)" />
        <defs>
          <linearGradient
            id="shape-path-4"
            x1="20"
            x2="3.5"
            y1="0"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#808080" stopOpacity=".15" />
            <stop offset="1" stopColor="#808080" stopOpacity=".55" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        id="shape-size-5"
        style={{ position: "absolute", top: 70, right: 112, zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 10 10"
      >
        <circle cx="5" cy="5" r="5" fill="url(#shape-path-5)" opacity=".64" />
        <defs>
          <linearGradient
            id="shape-path-5"
            x1="13"
            x2="3.5"
            y1="-1.5"
            y2="8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#808080" stopOpacity=".15" />
            <stop offset="1" stopColor="#808080" stopOpacity=".55" />
          </linearGradient>
        </defs>
      </svg>
    </Grid2>
  );
}

export default Home;
