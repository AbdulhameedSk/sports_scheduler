import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sportslist from "./pages/Sportlist";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Sportslist />} />
      </Routes>
    </>
  );
}

export default App;