import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEmotionPrediction } from "../../hooks/useEmotionPrediction";

function EmoSendButton({ text, onColorUpdate }) {
  const { predictEmotionAndGetColor, loading, isModelReady } =
    useEmotionPrediction();

  const handleClick = async () => {
    try {
      const { emotion, color } = await predictEmotionAndGetColor(text);
      console.log(`Predicted: ${emotion} | Input: ${text}`);
      onColorUpdate(color);
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  return (
    <IconButton
      aria-label="send"
      onClick={handleClick}
      disabled={loading || !isModelReady || !text}
      sx={{
        border: "1px solid gray",
        borderRadius: 1,
        ml: 0.5,
        bgcolor: "#147efb",
        height: "50%",
      }}
    >
      <SendIcon />
    </IconButton>
  );
}

export default EmoSendButton;
