import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function EmotionMenu() {
  const [emotion, setEmotion] = React.useState(2);

  const handleChange = (event) => {
    setEmotion(event.target.value);
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
          bgcolor: "#FF0055",
          borderRadius: 2,
          color: "white",
          fontWeight: "bold",
          fontSize: 14,
          px: 1,
          height: 30,
        }}
        labelId="emotion-select-label"
        id="emotion-select"
        value={emotion}
        onChange={handleChange}
      >
        <MenuItem value={0}>Happiness</MenuItem>
        <MenuItem value={1}>Sadness</MenuItem>
        <MenuItem value={2}>Anger</MenuItem>
      </Select>
    </FormControl>
  );
}

export default EmotionMenu;
