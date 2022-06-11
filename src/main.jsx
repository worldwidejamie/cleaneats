import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import App from "./App";
import AppTopBar from "./components/AppBar";
import PassingRestaurantGrid from "./components/PassingRestaurantGrid";
import FailingRestaurantGrid from "./components/FailingRestaurantGrid";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <AppTopBar />
    <FailingRestaurantGrid />
    <PassingRestaurantGrid />
  </React.StrictMode>
);
