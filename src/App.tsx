import "./App.css";
import Nav from "./components/Nav/Nav";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/Popular";
import Sneakers from "./pages/Sneakers/Sneakers";
import SneakerDetails from "./pages/SneakerDetails/SneakerDetails";
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/sneakers/:brand" element={<Sneakers />} />
        <Route path="/sneaker/:styleID" element={<SneakerDetails />} />
      </Routes>
    </main>
  );
}

export default App;
