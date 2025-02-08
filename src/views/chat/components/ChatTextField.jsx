import { Grid2, InputBase } from "@mui/material";
import { useState } from "react";
import React from "react";
import EmoSendButton from "./SendMessageButton";
import { useEmotionPrediction } from "../../../hooks/useEmotionPrediction";

function ChatTextField({ onColorUpdate }) {
  const [text, setText] = useState("");

  const { predictEmotion, modelLoading, isModelReady } = useEmotionPrediction();

  const handleEnter = async () => {
    try {
      const { emotion, color } = await predictEmotion(text);
      console.log(`Predicted: ${emotion}\n---\nInput: ${text}`);
      onColorUpdate(color);
      setText("");
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  const handleKeyDown = async (pressedKey) => {
    if (pressedKey === "Enter" && !modelLoading && isModelReady && text) {
      await handleEnter();
    }
  };

  return (
    <Grid2
      sx={{
        pt: 0,
        width: "100%",
        justifySelf: "flex-end",
        alignSelf: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <InputBase
        id="message-input"
        multiline
        autoFocus
        value={text}
        maxRows={4}
        onKeyDown={async (event) => await handleKeyDown(event.key)}
        placeholder="Go tell 'em champ"
        label="Type your message"
        onChange={(event) => {
          if (event.target.value !== "\n") setText(event.target.value);
        }}
        sx={{
          border: "2px solid lightblue",
          borderRadius: "0.5em",
          width: "68%",
          p: 1,
        }}
      />
      <EmoSendButton
        text={text}
        modelLoading={modelLoading}
        isModelReady={isModelReady}
        handleClick={handleEnter}
      />
    </Grid2>
  );
}

export default ChatTextField;
