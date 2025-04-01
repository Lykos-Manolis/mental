import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";

function EmotionMenu({ emotionAnalytics, activeEmotion, setActiveEmotion }) {
  const theme = useTheme();

  const handleChange = (event) => {
    setActiveEmotion(
      emotionAnalytics.find((emotion) => emotion.id === event.target.value),
    );
  };

  return (
    <FormControl
      sx={{
        minWidth: 80,
      }}
    >
      <Select
        sx={{
          minWidth: 80,
          bgcolor: theme.palette.emotion[activeEmotion.label],
          borderRadius: 2,
          color: "white",
          fontWeight: "bold",
          fontSize: 14,
          px: 1,
          height: 30,
        }}
        labelId="emotion-select-label"
        id="emotion-select"
        value={activeEmotion.id}
        onChange={handleChange}
      >
        {emotionAnalytics.map((emotion) => (
          <MenuItem value={emotion.id} key={emotion.id}>
            {emotion.label.charAt(0).toUpperCase() + emotion.label.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default EmotionMenu;
