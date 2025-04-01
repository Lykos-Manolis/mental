import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";

export function useEmotionColors(messages, conversationInfo, userId) {
  const theme = useTheme();
  const [backgroundColors, setBackgroundColors] = useState([
    theme.palette.background.default,
    theme.palette.background.default,
  ]);

  const getLastEmotions = () => {
    if (!messages || !conversationInfo) {
      return { userEmotion: null, participantEmotion: null };
    }

    const userMessages = messages.filter((msg) => msg.sender_id === userId);
    const participantMessages = messages.filter(
      (msg) => msg.sender_id === conversationInfo.participant_id,
    );

    const userEmotion =
      userMessages.length > 0
        ? userMessages[userMessages.length - 1].emotion
        : null;
    const participantEmotion =
      participantMessages.length > 0
        ? participantMessages[participantMessages.length - 1].emotion
        : null;

    return { userEmotion, participantEmotion };
  };

  useEffect(() => {
    const { userEmotion, participantEmotion } = getLastEmotions();
    const userBgColor =
      userEmotion && theme.palette.emotion[userEmotion]
        ? theme.palette.emotion[userEmotion]
        : theme.palette.background.default;
    const participantBgColor =
      participantEmotion && theme.palette.emotion[participantEmotion]
        ? theme.palette.emotion[participantEmotion]
        : theme.palette.background.default;

    setBackgroundColors([userBgColor, participantBgColor]);
  }, [messages, conversationInfo, userId, theme]);

  return {
    backgroundColors,
    setBackgroundColors,
  };
}
