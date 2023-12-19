import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import MainPage from "./mainPage";
import { Users } from "./components/user";

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={<div>Something went wrong.</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<MainPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
