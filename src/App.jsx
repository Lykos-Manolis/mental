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
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      inverse: "#ffffff",
      paper: "#000000",
    },
    text: {
      primary: "#ffffff",
      inverse: "#000000",
    },
    primary: {
      main: "#5727C7",
    },
    activity: {
      online: "#44b700",
      offline: "#b70000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      inverse: "#ffffff",
      paper: "#000000",
    },
    text: {
      primary: "#ffffff",
      inverse: "#000000",
    },
    primary: {
      main: "#5727C7",
    },
    activity: {
      online: "#44b700",
      offline: "#b70000",
    },
    emotion: {
      admiration: "rgb(255, 196, 0)",
      amusement: "rgba(255, 192, 203, 1)",
      anger: "rgba(255, 0, 0, 1)",
      annoyance: "rgba(255, 99, 71, 1)",
      approval: "rgba(50, 205, 50, 1)",
      caring: "rgba(255, 182, 193, 1)",
      confusion: "rgba(147, 112, 219, 1)",
      curiosity: "rgba(135, 206, 235, 1)",
      desire: "rgba(255, 20, 147, 1)",
      disappointment: "rgb(68, 5, 77)",
      disapproval: "rgba(139, 0, 0, 1)",
      disgust: "rgba(0, 100, 0, 1)",
      embarrassment: "rgba(219, 112, 147, 1)",
      excitement: "rgb(228, 205, 1)",
      fear: "rgba(25, 25, 112, 1)",
      gratitude: "rgba(218, 165, 32, 1)",
      grief: "rgba(0, 0, 0, 1)",
      joy: "rgba(255, 255, 0, 1)",
      love: "rgb(206, 0, 103)",
      nervousness: "rgba(176, 196, 222, 1)",
      optimism: "rgba(255, 165, 0, 1)",
      pride: "rgba(148, 0, 211, 1)",
      realization: "rgba(64, 224, 208, 1)",
      relief: "rgba(152, 251, 152, 1)",
      remorse: "rgba(70, 130, 180, 1)",
      sadness: "#5500FF",
      surprise: "rgba(255, 105, 180, 1)",
      neutral: "rgba(128, 128, 128, 1)",
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ModelProvider>
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
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
      </ModelProvider>
    </AuthProvider>
  );
}

export default App;
