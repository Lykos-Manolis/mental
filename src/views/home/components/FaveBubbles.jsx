import React from "react";
import FaveBubble from "./FaveBubble";
import { Stack, Grid2, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { EMOTION_COLORS } from "../../../constants/emotions";

const swiperSize = 80;

function FaveBubbles({ faves }) {
  const navigate = useNavigate();

  return (
    <Grid2 size={12}>
      {faves.length > 0 && (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
          initialSlide={Math.floor(faves.length / 2)}
          touchRatio={1.2}
          cardsEffect={{
            perSlideOffset: 50,
            perSlideRotate: 0,
          }}
          preventClicks={false}
          preventClicksPropagation={false}
          onTap={(swiper, event) => {
            const activeIndex = swiper.activeIndex;
            const activeFave = faves[activeIndex];
            navigate(`/chat/${activeFave.conversation_id}`);
          }}
          style={{
            width: swiperSize,
            height: swiperSize,
          }}
        >
          {faves.map((fave) => (
            <SwiperSlide
              component={Link}
              to={`/chat/${fave.conversation_id}`}
              alt={fave.full_name}
              key={fave.id}
              style={{
                backgroundImage: `url(${fave?.avatar_url?.replace(
                  "=s96-c",
                  `=s${swiperSize}-c`,
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                border: "3px solid #5727C7",
                backgroundColor: fave?.last_message?.emotion
                  ? EMOTION_COLORS[fave?.last_message?.emotion]
                  : "gray",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  backdropFilter: "blur(10px)",
                  borderRadius: "10px 0 0 0",
                  p: 1,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: "20%",
                  color: "text.primary",
                }}
              >
                {fave.full_name}
              </Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Grid2>
  );
}

export default FaveBubbles;
