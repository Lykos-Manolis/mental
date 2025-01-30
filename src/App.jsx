import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import HomeView from "./views/HomeView";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./views/NotFound";
import ChatView from "./views/ChatView";
import WinePredictor from "./components/WinePredictor";
import EmotionPredictor from "./components/EmotionPredictor";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/chat/:chatId" element={<ChatView />} />
          <Route path="/predict" element={<EmotionPredictor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
