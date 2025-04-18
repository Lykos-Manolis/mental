import React from "react";

function MessageParticle({ emotion }) {
  switch (emotion) {
    case "admiration":
      return "✨";
    case "amusement":
      return "😄";
    case "anger":
      return "😠";
    case "annoyance":
      return "😤";
    case "approval":
      return "👍";
    case "caring":
      return "🤗";
    case "confusion":
      return "😕";
    case "curiosity":
      return "🤔";
    case "desire":
      return "😍";
    case "disappointment":
      return "😞";
    case "disapproval":
      return "👎";
    case "disgust":
      return "🤢";
    case "embarrassment":
      return "😳";
    case "excitement":
      return "🤩";
    case "fear":
      return "😨";
    case "gratitude":
      return "🙏";
    case "grief":
      return "😢";
    case "joy":
      return "😊";
    case "love":
      return "❤️";
    case "nervousness":
      return "😰";
    case "optimism":
      return "🌟";
    case "pride":
      return "🦁";
    case "realization":
      return "💡";
    case "relief":
      return "😌";
    case "remorse":
      return "😔";
    case "sadness":
      return "😥";
    case "surprise":
      return "😲";
    case "neutral":
      return "😶";
    default:
      return "😶";
  }
}

export default MessageParticle;
