import Logo from "../../assets/logo.png";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import "./nav.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchOverlay from "../SearchOverlay/SearchOverlay";
function Nav() {
  const [showMobileNaw, setShowMobileNav] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const closeOverlay = () => {
    setShowSearchOverlay(false);
    setShowMobileNav(false);
  };

  return (
    <nav className="navigation-menu">
      <div className="navigation-menu--mobile">
        <Bars3Icon
          className="navigation-menu--icon"
          onClick={() => setShowMobileNav(!showMobileNaw)}
        />
        <img src={Logo} alt="logo of shoes" />
      </div>

      <ul
        onClick={() => setShowMobileNav(false)}
        className={`navigation-menu--links  ${
          showMobileNaw
            ? "navigation-menu--links-show"
            : "navigation-menu--links-hide"
        }`}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/popular">Popular</Link>
        </li>
        <li>
          <Link to="/sneakers/nike">Nike</Link>
        </li>
        <li>
          <Link to="/sneakers/jordan">Jordans</Link>
        </li>
        <li>
          <Link to="/sneakers/adidas">Adidas</Link>
        </li>
        <li>
          <MagnifyingGlassIcon
            className="magnifying-glass-icon"
            onClick={() => setShowSearchOverlay(true)}
          />
        </li>
        <li>
          <img width={80} src={Logo} alt="logo of shoes" />
        </li>
      </ul>

      {showSearchOverlay && <SearchOverlay closeOverlay={closeOverlay} />}
    </nav>
  );
}

export default Nav;
