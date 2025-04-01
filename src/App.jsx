import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnauthorizedPage from "./views/401";
import NotFoundPage from "./views/404";
import { Dashboard } from "./views/dashboard";
import { Chat } from "./views/chat";
import { Home } from "./views/home";
import { Login } from "./views/login";
import { AuthProvider } from "./auth/AuthContext";
import { ModelProvider } from "./context/ModelContext";
import { useState, createContext } from "react";

// Create a theme context
export const ThemeContext = createContext();

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#121212",
    },
    background: {
      default: "#121212",
      paper: "#121212",
      contrast: "#ffffff",
    },
    bubble: {
      user: "rgba(217, 217, 217, 0.85)",
      partner: "rgba(255,255,255,0.35)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      contrast: "#000000",
    },
    action: {
      active: "#ffffff",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    activity: {
      online: "#44b700",
      offline: "#b70000",
    },
    emotion: {
      admiration: "#ffd54f",
      amusement: "#4dd0e1",
      anger: "#ef5350",
      annoyance: "#ffa726",
      approval: "#ccff90",
      caring: "#29b6f6",
      confusion: "#ba68c8",
      curiosity: "#90caf9",
      desire: "#f48fb1",
      disappointment: "#8c9eff",
      disapproval: "#7986cb",
      disgust: "#d4e157",
      embarrassment: "#d4e157",
      excitement: "#ffd54f",
      fear: "#7e57c2",
      gratitude: "#90caf9",
      grief: "#78909c",
      joy: "#ffd54f",
      love: "#ec407a",
      nervousness: "#9ccc65",
      optimism: "#66bb6a",
      pride: "#ffca28",
      realization: "#ccff90",
      relief: "#26c6da",
      remorse: "#9fa8da",
      sadness: "#5c6bc0",
      surprise: "#ffee58",
      neutral: "#bdbdbd",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
      contrast: "#000000",
    },
    bubble: {
      user: "rgba(0, 0, 0, 0.85)",
      partner: "rgba(0, 0, 0, 0.35)",
    },
    text: {
      primary: "#000000",
      secondary: "rgba(0, 0, 0, 0.7)",
      disabled: "rgba(0, 0, 0, 0.5)",
      contrast: "#ffffff",
    },
    action: {
      active: "#000000",
      hover: "rgba(0, 0, 0, 0.08)",
      selected: "rgba(0, 0, 0, 0.16)",
      disabled: "rgba(0, 0, 0, 0.3)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    activity: {
      online: "#44b700",
      offline: "#b70000",
    },
    emotion: {
      admiration: "#ffd54f",
      amusement: "#4dd0e1",
      anger: "#ef5350",
      annoyance: "#ffa726",
      approval: "#ccff90",
      caring: "#29b6f6",
      confusion: "#ba68c8",
      curiosity: "#90caf9",
      desire: "#f48fb1",
      disappointment: "#8c9eff",
      disapproval: "#7986cb",
      disgust: "#d4e157",
      embarrassment: "#d4e157",
      excitement: "#ffd54f",
      fear: "#7e57c2",
      gratitude: "#90caf9",
      grief: "#78909c",
      joy: "#ffd54f",
      love: "#ec407a",
      nervousness: "#9ccc65",
      optimism: "#66bb6a",
      pride: "#ffca28",
      realization: "#ccff90",
      relief: "#26c6da",
      remorse: "#9fa8da",
      sadness: "#5c6bc0",
      surprise: "#ffee58",
      neutral: "#bdbdbd",
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <AuthProvider>
      <ModelProvider>
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
          <BrowserRouter>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="/dashboard/:dashboardId" element={<Dashboard />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
        </ThemeContext.Provider>
      </ModelProvider>
    </AuthProvider>
  );
}

export default App;
