import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

function WinePredictor() {
  const [model, setModel] = useState(null);
  const [formData, setFormData] = useState({
    text: "love you",
  });
  const [prediction, setPrediction] = useState(null);

  // Load model when the component mounts
  useEffect(() => {
    async function loadModel() {
      const loadedModel = await tf.loadLayersModel("/emo_model_js/model.json");

      setModel(loadedModel);
    }
    loadModel();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    if (!model) {
      alert("Model is still loading...");
      return;
    }

    // Convert input values to a tensor
    const inputArray = Object.values(formData);
    const inputTensor = tf.tensor2d([inputArray]);

    // Make a prediction
    const predictionTensor = model.predict(inputTensor);
    const predictionArray = await predictionTensor.array();
    const predictedClassIndex = predictionArray[0].indexOf(
      Math.max(...predictionArray[0]),
    );

    // Map index to quality category
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
      <h2>Wine Quality Predictor</h2>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button onClick={handlePredict}>Predict</button>
      {prediction && <h3>Predicted Quality: {prediction}</h3>}
    </div>
  );
}

export default WinePredictor;
