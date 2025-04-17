import {
  Paper,
  Tooltip,
  Typography,
  Zoom,
  useTheme,
  tooltipClasses,
  styled,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { animate, onScroll, utils } from "animejs";

// Move the styled component outside the function component
const createStyledTooltip = (emotion) =>
  styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.emotion[emotion],
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.emotion[emotion],
      color: "black",
    },
  }));

function ChatMessage({
  content,
  sent_by_user,
  emotion,
  index,
  updateUserEmotion,
  updatePartnerEmotion,
}) {
  const updateEmotion = () => {
    if (sent_by_user) {
      updateUserEmotion(emotion);
    } else {
      updatePartnerEmotion(emotion);
    }
  };

  useEffect(() => {
    animate(`#message-${index}`, {
      autoplay: onScroll({
        container: ".chat-container",
        enter: "bottom-=50 top",
        leave: "top+=30 bottom",
        onEnter: () => updateEmotion(),
      }),
    });
  }, []);

  const theme = useTheme();

  // Use useMemo to avoid recreating the component on every render
  const StyledTooltip = useMemo(() => createStyledTooltip(emotion), [emotion]);

  // Calculate random padding only once when component mounts
  const randomPadding = useMemo(
    () => Math.floor(Math.random() * (10 - 4 + 1)) + 4,
    [],
  );

  return (
    <StyledTooltip
      title={`${emotion.charAt(0).toUpperCase()}${emotion.slice(1)}`}
      disableFocusListener
      slots={{
        transition: Zoom,
      }}
    >
      <Paper
        id={`message-${index}`}
        sx={{
          borderRadius: sent_by_user ? "20px 0 20px 20px" : "0 20px 20px 20px",
          maxWidth: "75%",
          width: "auto",
          px: content === " " ? randomPadding : 2,
          py: 1.2,
          bgcolor: sent_by_user
            ? theme.palette.bubble.user
            : theme.palette.bubble.partner,
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0)",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            lineHeight: 1.4,
            color: sent_by_user
              ? theme.palette.text.contrast
              : theme.palette.text.primary,
          }}
        >
          {content}
        </Typography>
      </Paper>
    </StyledTooltip>
  );
}

export default ChatMessage;
