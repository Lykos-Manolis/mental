import { Grid2, InputBase } from "@mui/material";
import { useState } from "react";
import React from "react";
import EmoSendButton from "./EmoSendButton";
import { useEmotionPrediction } from "../../hooks/useEmotionPrediction";

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
      container
      direction="row"
      wrap="nowrap"
      sx={{
        width: "75%",
        pt: 0,
        justifySelf: "flex-end",
        position: "absolute",
        top: "90%",
        left: "50%",
        transform: "translate(-50%, -50%)",
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
        placeholder="Type your message"
        label="Type your message"
        onChange={(event) => {
          if (event.target.value !== "\n") setText(event.target.value);
        }}
        sx={{
          width: "100%",
          border: "2px solid lightblue",
          borderRadius: "0.5em",
          backdropFilter: "blur(7px)",
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
