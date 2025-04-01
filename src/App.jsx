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
