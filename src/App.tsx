import "./App.css";
import Nav from "./components/Nav/Nav";
import { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/Popular";
import Sneakers from "./pages/Sneakers/Sneakers";
import SneakerDetails from "./pages/SneakerDetails/SneakerDetails";
export type Theme = "light" | "dark";

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem("sneaker-spotter-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // The site can still be used when storage is unavailable.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem("sneaker-spotter-theme", theme); } catch { /* Storage is optional. */ }
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav theme={theme} onToggleTheme={() => setTheme((current) => current === "light" ? "dark" : "light")} />
      <main id="main-content" tabIndex={-1}><Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/sneakers/:brand" element={<Sneakers />} />
        <Route path="/sneaker/:styleID" element={<SneakerDetails />} />
      </Routes></main>
    </div>
  );
}

export default App;
