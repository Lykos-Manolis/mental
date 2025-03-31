import React, { createContext, useContext, useState, useEffect } from "react";
import { EMOTION_COLORS, EMOTION_LABELS } from "../constants/emotions";
import {
  loadTokenizer,
  processTextWithTokenizer,
} from "../utils/textProcessing";

// Module-level variables to store instances
let tokenizer = null;
let model = null;

// Create a DB to store the model/tokenizer
const DB_NAME = "emotion-model-db";
const DB_VERSION = 1;
const MODEL_STORE = "models";

// Helper functions for IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(MODEL_STORE)) {
        db.createObjectStore(MODEL_STORE);
      }
    };
  });
};

const getItem = async (key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODEL_STORE, "readonly");
    const store = transaction.objectStore(MODEL_STORE);
    const request = store.get(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

const setItem = async (key, value) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MODEL_STORE, "readwrite");
    const store = transaction.objectStore(MODEL_STORE);
    const request = store.put(value, key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// NEW FUNCTION: Store only a flag that tokenizer was loaded
const storeTokenizerFlag = async () => {
  try {
    await setItem("tokenizerLoaded", { timestamp: Date.now() });
    console.log("Tokenizer flag saved to storage");
  } catch (error) {
    console.warn("Error saving tokenizer flag:", error);
  }
};

const ModelContext = createContext(null);

export function ModelProvider({ children }) {
  // Only keep loading states in React
  const [modelLoading, setModelLoading] = useState(true);
  const [tokenizerLoading, setTokenizerLoading] = useState(true);
  // Add progress tracking states
  const [modelProgress, setModelProgress] = useState(0);
  const [tokenizerProgress, setTokenizerProgress] = useState(0);

  useEffect(() => {
    async function loadAssets() {
      try {
        // First try to load from IndexedDB
        let modelFromStorage = await getItem("emotionModel");
        let tokenizerLoaded = await getItem("tokenizerLoaded");

        // Dynamically import TensorFlow.js
        const tf = await import("@tensorflow/tfjs");

        // Check if we have model in storage
        if (modelFromStorage) {
          try {
            console.log("Loading model from local storage...");
            model = await tf.loadGraphModel(tf.io.fromMemory(modelFromStorage));
            console.log("Model loaded from local storage");
            setModelProgress(100); // Set to 100% when loaded from cache
          } catch (error) {
            console.warn(
              "Error loading model from storage, will download fresh",
              error,
            );
            modelFromStorage = null;
          }
        }

        // If model not in storage, download it
        if (!model) {
          console.log("Downloading emotion prediction model...");
          model = await tf.loadGraphModel("/emo_model_js/model.json", {
            onProgress: (fraction) => {
              // Convert to percentage and log
              const percent = Math.round(fraction * 100);
              console.log(`Model download progress: ${percent}%`);
              setModelProgress(percent);
            },
          });

          // Save model to IndexedDB for future use
          try {
            const modelData = await model.save(
              tf.io.withSaveHandler(async (modelArtifacts) => {
                return modelArtifacts;
              }),
            );
            await setItem("emotionModel", modelData);
            console.log("Model saved to local storage");
          } catch (saveError) {
            console.warn("Error saving model to storage:", saveError);
          }
        }

        // Try to load tokenizer
        try {
          // Always load the tokenizer directly - we can't serialize it
          console.log("Loading tokenizer...");

          // The @xenova/transformers library has built-in progress callbacks
          tokenizer = await loadTokenizer((progress) => {
            const percent = Math.round(progress * 100);
            console.log(`Tokenizer loading progress: ${percent}%`);
            setTokenizerProgress(percent);
          });

          // Just store a flag that we've loaded it once
          if (tokenizer && !tokenizerLoaded) {
            await storeTokenizerFlag();
          }

          if (tokenizer) {
            console.log("Tokenizer ready");
          } else {
            console.warn("Tokenizer failed to load");
          }
        } catch (tokenizerError) {
          console.warn("Error with tokenizer:", tokenizerError);
        } finally {
          setTokenizerLoading(false);
        }
      } catch (error) {
        console.error("Error in load process:", error);
      } finally {
        setModelLoading(false);
      }
    }

    loadAssets();
  }, []);

  const debugPrediction = async () => {
    if (!model) return;

    // Try a few test phrases
    const phrases = [
      "I am so happy today",
      "This makes me very angry",
      "I feel sad about what happened",
      "That's really interesting",
      "I love you",
    ];

    for (const phrase of phrases) {
      try {
        const emotion = await predictEmotion(phrase);
        console.log(`Phrase: "${phrase}" → Predicted: ${emotion.emotion}`);
      } catch (error) {
        console.error(`Error predicting "${phrase}":`, error);
      }
    }
  };

  const predictEmotion = async (text) => {
    if (!model) {
      throw new Error("Model is still loading...");
    }

    if (!tokenizer || tokenizerLoading) {
      throw new Error("Tokenizer is still loading...");
    }

    try {
      // Dynamically import TensorFlow.js when needed
      const tf = await import("@tensorflow/tfjs");

      // Use the advanced tokenizer
      const encodedInputs = await processTextWithTokenizer(text);
      const { inputIds, attentionMask } = encodedInputs;

      console.log("Raw inputIds:", inputIds);
      console.log("Raw attentionMask:", attentionMask);

      // Convert BigInt values to Numbers since TF.js doesn't support BigInt
      const inputIdsArray = Array.from(inputIds.data).map(Number);
      const attentionMaskArray = Array.from(attentionMask.data).map(Number);

      console.log("Converted inputIdsArray:", inputIdsArray);
      console.log("Converted attentionMaskArray:", attentionMaskArray);

      // Get the dimensions from the original inputs
      const inputShape = [
        1,
        inputIds.dims ? inputIds.dims[1] : inputIds.data.length,
      ];

      // Create proper tensors with correct type
      const inputIdsTensor = tf.tensor2d(inputIdsArray, inputShape, "int32");
      const attentionMaskTensor = tf.tensor2d(
        attentionMaskArray,
        inputShape,
        "int32",
      );
      const tokenTypeIdsTensor = tf.zeros(inputShape, "int32");

      console.log("inputIdsTensor shape:", inputIdsTensor.shape);
      console.log("attentionMaskTensor shape:", attentionMaskTensor.shape);
      console.log("tokenTypeIdsTensor shape:", tokenTypeIdsTensor.shape);

      // Pass all three required tensors to the model
      const predictionTensor = model.predict({
        "input_ids:0": inputIdsTensor,
        "attention_mask:0": attentionMaskTensor,
        "token_type_ids:0": tokenTypeIdsTensor,
      });

      console.log("predictionTensor:", predictionTensor);

      // Handle the prediction tensor - it might be a single tensor or an object
      let logitsTensor;
      if (predictionTensor.hasOwnProperty("logits")) {
        logitsTensor = predictionTensor.logits;
      } else if (predictionTensor instanceof tf.Tensor) {
        logitsTensor = predictionTensor;
      } else {
        const keys = Object.keys(predictionTensor);
        if (keys.length > 0) {
          logitsTensor = predictionTensor[keys[0]];
        } else {
          throw new Error("Could not extract logits from model output");
        }
      }

      console.log("logitsTensor:", logitsTensor);

      // Get the values as a regular JavaScript array
      const predictionArray = await logitsTensor.array();
      console.log("predictionArray:", predictionArray);
      console.log("Prediction values:", predictionArray[0]);

      // Find the index with the highest score
      let predictedClassIndex;
      if (
        Array.isArray(predictionArray) &&
        predictionArray.length > 0 &&
        Array.isArray(predictionArray[0])
      ) {
        const scores = predictionArray[0];

        // Find max value and its index
        let maxScore = -Infinity;
        let maxIndex = 0; // Default to first class if all are NaN

        for (let i = 0; i < scores.length; i++) {
          if (!isNaN(scores[i]) && scores[i] > maxScore) {
            maxScore = scores[i];
            maxIndex = i;
          }
        }

        predictedClassIndex = maxIndex;
        console.log(`Max score: ${maxScore} at index: ${maxIndex}`);
      } else {
        throw new Error("Unexpected prediction format");
      }

      // Fall back to a default emotion if we couldn't predict properly
      const predictedEmotion = EMOTION_LABELS[predictedClassIndex] || "neutral";
      const newColor = EMOTION_COLORS[predictedEmotion] || "#808080"; // default gray

      console.log("predictedEmotion:", predictedEmotion);

      // Cleanup tensors
      inputIdsTensor.dispose();
      attentionMaskTensor.dispose();
      tokenTypeIdsTensor.dispose();
      if (logitsTensor !== predictionTensor) {
        logitsTensor.dispose();
      }
      predictionTensor.dispose();

      return { emotion: predictedEmotion, color: newColor };
    } catch (error) {
      console.error("Error during prediction:", error);
      throw error;
    }
  };

  // Move debug function to useEffect to avoid running on every render
  // useEffect(() => {
  //   if (model && !modelLoading && !tokenizerLoading && tokenizer) {
  //     debugPrediction();
  //   }
  // }, [model, modelLoading, tokenizerLoading, tokenizer]);

  return (
    <ModelContext.Provider
      value={{
        predictEmotion,
        modelLoading,
        tokenizerLoading,
        isModelReady: !!model && !!tokenizer,
        modelProgress, // Add progress to context
        tokenizerProgress, // Add progress to context
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export const useModel = () => useContext(ModelContext);
