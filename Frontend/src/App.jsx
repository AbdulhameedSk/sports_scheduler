import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sportslist from "./pages/Sportlist";
import Createsport from "./pages/Createsport";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Sportslist />} />
        <Route path="/sports" element={<Sportslist />} />
        <Route path="/add-sport" element={<Createsport />} />
      </Routes>
    </>
  );
}

export default App;
