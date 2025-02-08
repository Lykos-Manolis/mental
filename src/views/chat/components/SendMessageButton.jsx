import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEmotionPrediction } from "../../../hooks/useEmotionPrediction";

function SendMessageButton({ text, modelLoading, isModelReady, handleClick }) {
  return (
    <IconButton
      aria-label="send"
      onClick={handleClick}
      disabled={modelLoading || !isModelReady || !text.replace(/\s/g, "")}
      sx={{
        border: "1px solid gray",
        borderRadius: 1,
        ml: 1,
        bgcolor: "#147efb",
      }}
    >
      <SendIcon />
    </IconButton>
  );
}

export default SendMessageButton;
