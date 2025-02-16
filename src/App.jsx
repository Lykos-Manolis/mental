import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnauthorizedPage from "./views/401";
import NotFoundPage from "./views/404";
import { Chat } from "./views/chat";
import { Home } from "./views/home";
import { Login } from "./views/login";
import { AuthProvider } from "./auth/AuthContext";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
