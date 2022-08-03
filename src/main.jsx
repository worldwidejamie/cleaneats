import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import AppTopBar from "./components/AppBar";
import RestaurantGrid from "./components/RestaurantGrid";

import "./index.css";
// const document = document;

if (typeof document !== "undefined") {
  // eslint-disable-next-line no-undef
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <CssBaseline />
      <AppTopBar />
      <RestaurantGrid inspectionResult="Pass" />
      <RestaurantGrid inspectionResult="Fail" />
    </React.StrictMode>
  );
}
