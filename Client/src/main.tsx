import React from "react";
import ReactDOM from "react-dom";
import { Router } from "./routes";
import "./main.css";
import AuthProvider from "./context/AuthProvider";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
