import "./App.css";
import Nav from "./components/Nav/Nav";
import usePopularSneakers from "./hooks/usePopularSneakers";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/Popular";
function App() {
  const pop = usePopularSneakers();

  console.log(pop);
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/popular" Component={Popular} />
      </Routes>
    </div>
  );
}

export default App;
