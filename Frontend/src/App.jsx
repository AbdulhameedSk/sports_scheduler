import React from "react";
import { Routes, Route } from "react-router-dom";
import Body from "./pages/Body";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
      </Routes>
    </>
  );
}

export default App;
