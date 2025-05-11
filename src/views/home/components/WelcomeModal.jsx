import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Paper,
  Link,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InfoIcon from "@mui/icons-material/Info";
import BugReportIcon from "@mui/icons-material/BugReport";
import FeedbackIcon from "@mui/icons-material/Feedback";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PanToolIcon from "@mui/icons-material/PanTool";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ErrorIcon from "@mui/icons-material/Error";
import DevicesIcon from "@mui/icons-material/Devices";
import SyncIcon from "@mui/icons-material/Sync";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function WelcomeModal({ open, onClose }) {
  const theme = useTheme();

  const highlight = {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main,
    fontWeight: 700,
    display: "inline-block",
    px: 0.5,
    borderRadius: 1,
    bgcolor:
      theme.palette.mode === "dark"
        ? `${theme.palette.primary.main}33`
        : `${theme.palette.primary.main}22`,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="welcome-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%" },
          maxWidth: 600,
          outline: "none",
          overflow: "hidden",
          borderRadius: 3,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.5)"
              : "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Swiper
          modules={[Pagination, EffectFade]}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active",
            bulletClass: "swiper-pagination-bullet",
            bulletElement: "div",
          }}
          spaceBetween={0}
          slidesPerView={1}
          speed={700}
          effect="fade"
        >
          {/* First slide - Welcome */}
          <SwiperSlide>
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "450px",
                textAlign: "center",
                backgroundColor: theme.palette.welcomeModal.welcome,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(0, 0, 0, 0.87)",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage:
                    "radial-gradient(circle at 10% 10%, rgba(255,255,255,0.08) 0%, transparent 70%)",
                  zIndex: 0,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <EmojiEmotionsIcon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.emotion.joy,
                      mr: 2,
                      filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))",
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      color: theme.palette.emotion.joy,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    Welcome!!
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem" }}>
                  A messaging app that helps you{" "}
                  <Box component="span" sx={highlight}>
                    express
                  </Box>{" "}
                  and{" "}
                  <Box component="span" sx={highlight}>
                    understand
                  </Box>{" "}
                  feelings in conversations.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem" }}>
                  Built with several technologies, many AI training attempts and
                  lots of love{" "}
                  <Box
                    component="span"
                    sx={{ color: "#ff6b6b", fontSize: "1.2rem" }}
                  >
                    ❤️
                  </Box>
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
                  Thanks for installing - I hope you{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, fontStyle: "italic" }}
                  >
                    enjoy your stay!
                  </Box>
                </Typography>
              </Box>
              <Box
                sx={{ mt: "auto", mb: 1, width: "100%", textAlign: "right" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    animation: "pulse 1.5s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 0.7 },
                      "50%": { opacity: 1 },
                    },
                  }}
                >
                  Swipe right to continue{" "}
                  <Box component="span" sx={{ transform: "translateY(2px)" }}>
                    →
                  </Box>
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>

          {/* Second slide - Information */}
          <SwiperSlide>
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "450px",
                backgroundColor: theme.palette.welcomeModal.info,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(0, 0, 0, 0.87)",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage:
                    "radial-gradient(circle at 90% 10%, rgba(255,255,255,0.08) 0%, transparent 70%)",
                  zIndex: 0,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <InfoIcon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.emotion.curiosity,
                      mr: 2,
                      filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))",
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      color: theme.palette.emotion.curiosity,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    How it works
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "left", width: "100%", mb: 2, px: 1 }}>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.5,
                      fontSize: "1.05rem",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateX(5px)" },
                    }}
                  >
                    <MenuOpenIcon
                      sx={{ color: theme.palette.emotion.curiosity, mt: 0.3 }}
                    />
                    Swipe from the left to access the menu and add contacts
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.5,
                      fontSize: "1.05rem",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateX(5px)" },
                    }}
                  >
                    <ColorLensIcon
                      sx={{ color: theme.palette.emotion.curiosity, mt: 0.3 }}
                    />
                    Backgrounds change based on conversation emotions
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.5,
                      fontSize: "1.05rem",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateX(5px)" },
                    }}
                  >
                    <PanToolIcon
                      sx={{ color: theme.palette.emotion.curiosity, mt: 0.3 }}
                    />
                    Hold messages to view their detected emotion
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.5,
                      fontSize: "1.05rem",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateX(5px)" },
                    }}
                  >
                    <DashboardIcon
                      sx={{ color: theme.palette.emotion.curiosity, mt: 0.3 }}
                    />
                    Check the dashboard for conversation insights
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ mt: "auto", mb: 1, width: "100%", textAlign: "right" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    animation: "pulse 1.5s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 0.7 },
                      "50%": { opacity: 1 },
                    },
                  }}
                >
                  Swipe right to continue{" "}
                  <Box component="span" sx={{ transform: "translateY(2px)" }}>
                    →
                  </Box>
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>

          {/* Third slide - Known Issues */}
          <SwiperSlide>
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "450px",
                backgroundColor: theme.palette.welcomeModal.issues,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(0, 0, 0, 0.87)",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage:
                    "radial-gradient(circle at 90% 90%, rgba(255,255,255,0.08) 0%, transparent 70%)",
                  zIndex: 0,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <BugReportIcon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.emotion.annoyance,
                      mr: 2,
                      filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))",
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      color: theme.palette.emotion.annoyance,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    Known Issues
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "left", width: "100%", mb: 2, px: 1 }}>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.5,
                      fontSize: "1.05rem",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateX(5px)" },
                    }}
                  >
                    <ErrorIcon
                      sx={{ color: theme.palette.emotion.annoyance, mt: 0.3 }}
                    />
                    Some backgrounds may not display on certain devices
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.5,
                      fontSize: "1.05rem",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateX(5px)" },
                    }}
                  >
                    <DevicesIcon
                      sx={{ color: theme.palette.emotion.annoyance, mt: 0.3 }}
                    />
                    Limited cross-device responsiveness
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.5,
                      fontSize: "1.05rem",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateX(5px)" },
                    }}
                  >
                    <SyncIcon
                      sx={{ color: theme.palette.emotion.annoyance, mt: 0.3 }}
                    />
                    2xx alerts indicate emotion detection is loading{" "}
                    <Box
                      component="span"
                      sx={{ fontSize: "0.9rem", fontStyle: "italic" }}
                    >
                      (don't worry, your message will still be sent)
                    </Box>
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ mt: "auto", mb: 1, width: "100%", textAlign: "right" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    animation: "pulse 1.5s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 0.7 },
                      "50%": { opacity: 1 },
                    },
                  }}
                >
                  Swipe right to continue{" "}
                  <Box component="span" sx={{ transform: "translateY(2px)" }}>
                    →
                  </Box>
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>

          {/* Fourth slide - Feedback */}
          <SwiperSlide>
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "450px",
                backgroundColor: theme.palette.welcomeModal.feedback,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(0, 0, 0, 0.87)",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage:
                    "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.08) 0%, transparent 70%)",
                  zIndex: 0,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <FeedbackIcon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.emotion.optimism,
                      mr: 2,
                      filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))",
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      color: theme.palette.emotion.optimism,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Box component="span">Feedback Matters</Box>
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontSize: "1.1rem", textAlign: "center" }}
                >
                  I created this app on my own with limited time as part of my
                  thesis,{" "}
                  <Box component="span" sx={highlight}>
                    so some things might break
                  </Box>
                  .
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ mb: 3, fontSize: "1.1rem", textAlign: "center" }}
                >
                  All feedback and ideas are welcome and appreciated!
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                    mb: 4,
                  }}
                >
                  <Link
                    href="mailto:lykosmanolis@gmail.com"
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-5px)" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: `${theme.palette.emotion.optimism}22`,
                        mb: 1,
                      }}
                    >
                      <EmailIcon
                        sx={{
                          fontSize: 30,
                          color: theme.palette.emotion.optimism,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Email
                    </Typography>
                  </Link>
                  <Link
                    href="https://linkedin.com/in/manolis-lykos-504472289"
                    target="_blank"
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-5px)" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: `${theme.palette.emotion.optimism}22`,
                        mb: 1,
                      }}
                    >
                      <LinkedInIcon
                        sx={{
                          fontSize: 30,
                          color: theme.palette.emotion.optimism,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      LinkedIn
                    </Typography>
                  </Link>
                  <Link
                    href="https://github.com/Lykos-Manolis"
                    target="_blank"
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-5px)" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: `${theme.palette.emotion.optimism}22`,
                        mb: 1,
                      }}
                    >
                      <GitHubIcon
                        sx={{
                          fontSize: 30,
                          color: theme.palette.emotion.optimism,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      GitHub
                    </Typography>
                  </Link>
                </Box>

                <Box sx={{ mt: "auto", width: "100%" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    fullWidth
                    sx={{
                      bgcolor: theme.palette.emotion.optimism,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      py: 1.2,
                      borderRadius: 2,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.emotion.optimism + "dd"
                            : theme.palette.emotion.optimism + "cc",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    Get Started!
                  </Button>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Paper>
    </Modal>
  );
}

export default WelcomeModal;
