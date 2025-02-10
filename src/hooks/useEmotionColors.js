import { useState, useEffect } from "react";
import { EMOTION_COLORS } from "../constants/emotions";

export function useEmotionColors(messages, conversationInfo, userId) {
  const [backgroundColors, setBackgroundColors] = useState([
    EMOTION_COLORS.default,
    EMOTION_COLORS.default,
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
    const userBgColor = EMOTION_COLORS[userEmotion] || EMOTION_COLORS.default;
    const participantBgColor =
      EMOTION_COLORS[participantEmotion] || EMOTION_COLORS.default;

    setBackgroundColors([userBgColor, participantBgColor]);
  }, [messages, conversationInfo, userId]);

  return {
    backgroundColors,
    setBackgroundColors,
  };
}
