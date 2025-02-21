import { Badge, styled } from "@mui/material";
const StyledBadge = styled(Badge)(({ theme, isonline }) => ({
  "& .MuiBadge-badge": {
    backgroundColor:
      isonline === "true"
        ? theme.palette.activity.online
        : theme.palette.activity.offline,
    color:
      isonline === "true"
        ? theme.palette.activity.online
        : theme.palette.activity.offline,
    boxShadow:
      isonline === "true"
        ? `0 0 0 2px ${theme.palette.activity.online}`
        : `0 0 0 2px ${theme.palette.activity.offline}`,
    "&::after": {
      position: "absolute",
      top: -2,
      left: -2,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation:
        isonline === "true" ? "ripple 3.2s infinite ease-in-out" : "none",
      border: "2px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "50%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default StyledBadge;
