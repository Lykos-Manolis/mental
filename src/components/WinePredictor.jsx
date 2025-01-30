import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

function WinePredictor() {
  const [model, setModel] = useState(null);
  const [formData, setFormData] = useState({
    "fixed acidity": 7.4,
    "volatile acidity": 0.7,
    "citric acid": 0.0,
    "residual sugar": 1.9,
    chlorides: 0.076,
    "free sulfur dioxide": 11.0,
    "total sulfur dioxide": 34.0,
    density: 0.9978,
    pH: 3.51,
    sulphates: 0.56,
    alcohol: 9.4,
  });
  const [prediction, setPrediction] = useState(null);

  // Load model when the component mounts
  useEffect(() => {
    async function loadModel() {
      const loadedModel = await tf.loadLayersModel("/wine_model_js/model.json");

      setModel(loadedModel);
    }
    loadModel();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
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
    const qualityCategories = [
      "low quality",
      "lower medium quality",
      "upper medium quality",
      "high quality",
    ];
    setPrediction(qualityCategories[predictedClassIndex]);
  };

  return (
    <div>
      <h2>Wine Quality Predictor</h2>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="number"
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
