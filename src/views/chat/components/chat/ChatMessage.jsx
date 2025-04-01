import {
  Paper,
  Tooltip,
  Typography,
  Zoom,
  useTheme,
  tooltipClasses,
  styled,
} from "@mui/material";
import React, { useMemo } from "react";

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

function ChatMessage({ content, sent_by_user, emotion }) {
  const theme = useTheme();

  // Use useMemo to avoid recreating the component on every render
  const StyledTooltip = useMemo(() => createStyledTooltip(emotion), [emotion]);

  return (
    <StyledTooltip
      title={`Detected emotion: ${emotion}`}
      disableFocusListener
      slots={{
        transition: Zoom,
      }}
    >
      <Paper
        sx={{
          borderRadius: sent_by_user ? "20px 0 20px 20px" : "0 20px 20px 20px",
          maxWidth: "75%",
          width: "auto",
          px: 2,
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
