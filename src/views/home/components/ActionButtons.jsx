import React from "react";
import { Button, Stack, Grid2, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ActionButtons({ onOpenContactModal, onOpenFavoritesModal }) {
  const svgBackground = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='393' height='154' fill='none' viewBox='0 0 393 104'%3E%3Cg filter='url(%23a)'%3E%3Cpath fill='%23000' d='M-150 30h283.596a48.998 48.998 0 0 1 25.538 7.181l11.828 7.223a49 49 0 0 0 51.076 0l11.828-7.223A48.998 48.998 0 0 1 259.404 30H543v74h-693V30Z'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='a' width='751.6' height='132.6' x='-179.3' y='.7' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeMorphology in='SourceAlpha' operator='dilate' radius='4' result='effect1_dropShadow_70_153'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='12.65'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'/%3E%3CfeBlend in2='BackgroundImageFix' result='effect1_dropShadow_70_153'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow_70_153' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E")`;

  return (
    <Grid2
      container
      sx={{
        justifyContent: "space-around",
        alignItems: "end",
        backgroundImage: svgBackground,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100px",
        p: 2,
        zIndex: 1,
      }}
    >
      <Grid2>
        <IconButton aria-label="add contact" onClick={onOpenContactModal}>
          <ControlPointIcon
            sx={{ color: "primary.main", width: 30, height: 30 }}
          />
        </IconButton>
      </Grid2>
      <Grid2>
        <IconButton
          aria-label="add to favorites"
          onClick={onOpenFavoritesModal}
        >
          <FavoriteBorderIcon
            sx={{ color: "primary.main", width: 30, height: 30 }}
          />
        </IconButton>
      </Grid2>
    </Grid2>
  );
}

export default ActionButtons;
