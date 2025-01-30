import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const MAX_LENGTH = 100; // Fixed sequence length

function EmotionPredictor() {
  const [model, setModel] = useState(null);
  const [text, setText] = useState("love you");
  const [prediction, setPrediction] = useState(null);
  const [wordIndex, setWordIndex] = useState({});

  // Load model and word_index.json
  useEffect(() => {
    async function loadAssets() {
      // Load the model
      const loadedModel = await tf.loadLayersModel("/emo_model_js/model.json");
      setModel(loadedModel);

      // Load the word_index.json
      const response = await fetch("/word_index.json");
      const wordIndexData = await response.json();
      setWordIndex(wordIndexData); // Store the word index
    }

    loadAssets();
  }, []);

  const textToSequences = (text) => {
    // Tokenize text into indices using the word_index
    const words = text.toLowerCase().split(" ");
    const sequence = words.map((word) => wordIndex[word] || 0); // Map words to indices or 0 if unknown
    return sequence;
  };

  const padSequence = (sequence) => {
    // Pad sequence to MAX_LENGTH
    while (sequence.length < MAX_LENGTH) {
      sequence.push(0); // Padding
    }
    return sequence.slice(0, MAX_LENGTH); // Truncate if too long
  };

  const textToTensor = (text) => {
    const sequence = textToSequences(text);
    const paddedSequence = padSequence(sequence);
    return tf.tensor2d([paddedSequence], [1, MAX_LENGTH]); // Shape [1, MAX_LENGTH]
  };

  const handlePredict = async () => {
    if (!model) {
      alert("Model is still loading...");
      return;
    }

    const inputTensor = textToTensor(text);
    const predictionTensor = model.predict(inputTensor);
    const predictionArray = await predictionTensor.array();
    const predictedClassIndex = predictionArray[0].indexOf(
      Math.max(...predictionArray[0]),
    );

    console.log(inputTensor);
    console.log(predictionTensor);
    console.log(predictionArray);

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
    setPrediction(EMOTION_LABELS[predictedClassIndex]);
  };

  return (
    <div>
      <h2>Emotion Predictor</h2>
      <label>Enter text:</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handlePredict}>Predict</button>
      {prediction && <h3>Predicted Emotion: {prediction}</h3>}
    </div>
  );
}

export default EmotionPredictor;
