import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import App from "./App";
import ReactPWAInstallProvider from "@teuteuf/react-pwa-install";

ReactDOM.render(
  <React.StrictMode>
    <ReactPWAInstallProvider>
      <App />
    </ReactPWAInstallProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
