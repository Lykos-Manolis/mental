import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MAX_LENGTH = 100; // Fixed sequence length
const EMOTION_LABELS = [
  "admiration",
  "amusement",
  "anger",
  "annoyance",
  "approval",
  "caring",
  "confusion",
  "curiosity",
  "desire",
  "disappointment",
  "disapproval",
  "disgust",
  "embarrassment",
  "excitement",
  "fear",
  "gratitude",
  "grief",
  "joy",
  "love",
  "nervousness",
  "optimism",
  "pride",
  "realization",
  "relief",
  "remorse",
  "sadness",
  "surprise",
  "neutral",
];

function EmoSendButton({ text }) {
  const [model, setModel] = useState(null);
  const [wordIndex, setWordIndex] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Model & Word Index on Mount
  useEffect(() => {
    async function loadAssets() {
      try {
        const loadedModel = await tf.loadLayersModel(
          "/emo_model_js/model.json",
        );
        setModel(loadedModel);

        const response = await fetch("/word_index.json");
        const wordIndexData = await response.json();
        setWordIndex(wordIndexData);
      } catch (error) {
        console.error("Error loading model or word index:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAssets();
  }, []);

  // Convert text to a sequence of token IDs
  const textToSequences = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => wordIndex[word] || 0);
  };

  // Pad the sequence to match model input size
  const padSequence = (sequence) => {
    while (sequence.length < MAX_LENGTH) sequence.push(0);
    return sequence.slice(0, MAX_LENGTH);
  };

  const makePrediction = async () => {
    if (!model) {
      alert("Model is still loading...");
      return;
    }

    try {
      const sequence = padSequence(textToSequences(text));
      const inputTensor = tf.tensor2d([sequence], [1, MAX_LENGTH]);

      const predictionTensor = model.predict(inputTensor);
      const predictionArray = await predictionTensor.array();
      const predictedClassIndex = predictionArray[0].indexOf(
        Math.max(...predictionArray[0]),
      );

      setPrediction(EMOTION_LABELS[predictedClassIndex]);
      console.log(
        `Predicted: ${EMOTION_LABELS[predictedClassIndex]} | Input: ${text}`,
      );

      // Cleanup tensors to free memory
      inputTensor.dispose();
      predictionTensor.dispose();
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <IconButton
      aria-label="send"
      onClick={makePrediction}
      disabled={loading || !model || !text}
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
