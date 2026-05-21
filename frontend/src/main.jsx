import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import { BrowserRouter, Route } from "react-router";
import { Routes } from "react-router";
import Test from "./pages/Test.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
