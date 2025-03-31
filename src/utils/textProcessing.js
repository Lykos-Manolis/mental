import { RobertaTokenizer, env } from "@xenova/transformers";
import { MODEL_CONSTANTS } from "../constants/model";

env.localModelPath = "./";

const { MAX_LENGTH } = MODEL_CONSTANTS;

let tokenizer = null;

export const loadTokenizer = async () => {
  try {
    tokenizer = await RobertaTokenizer.from_pretrained("tokenizer");
    console.log("Tokenizer loaded successfully");
    return tokenizer;
  } catch (error) {
    console.error("Error loading tokenizer:", error);
    throw error;
  }
};

export const processTextWithTokenizer = async (
  text,
  paddingLength = MAX_LENGTH,
) => {
  if (!tokenizer) {
    throw new Error("Tokenizer not loaded. Call loadTokenizer() first.");
  }

  if (text === null || text === undefined) {
    throw new Error("Text may not be null or undefined");
  }

  const encoded = await tokenizer(text, {
    padding: "max_length",
    max_length: paddingLength,
    truncation: true,
    return_tensors: "tf",
  });

  return {
    inputIds: encoded.input_ids,
    attentionMask: encoded.attention_mask,
  };
};
