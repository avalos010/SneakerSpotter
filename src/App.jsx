import "./App.css";
import Nav from "./components/Nav/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/Popular";
import Sneakers from "./pages/Sneakers/Sneakers";
function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/sneakers/:brand" element={<Sneakers />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
