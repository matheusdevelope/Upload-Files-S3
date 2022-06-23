import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./components/auth/AuthRoute";
import FormChangeManagerCredentials from "./components/FormChangePassManager";
import Home from "./pages/home";
import Login from "./pages/login";
import Log from "./pages/logs";
import Manager from "./pages/manager";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/firstAccess" element={<FormChangeManagerCredentials />} />

        <Route
          path="/home"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <AuthRoute>
              <Manager />
            </AuthRoute>
          }
        />
         <Route
          path="/logs"
          element={
            <AuthRoute>
              <Log />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
