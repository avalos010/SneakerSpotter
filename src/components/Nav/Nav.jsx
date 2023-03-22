import Logo from "../../assets/logo.png";
import { Bars3Icon } from "@heroicons/react/24/solid";
import "./nav.css";
import { useState } from "react";
function Nav() {
  const [showMobileNaw, setShowMobileNav] = useState(false);

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
        className={`navigation-menu--links  ${
          showMobileNaw
            ? "navigation-menu--links-show"
            : "navigation-menu--links-hide"
        }`}
      >
        <li>Nike</li>
        <li>Jordans</li>
        <li>Adidas</li>

        <img width={80} src={Logo} alt="logo of shoes" />
      </ul>
    </nav>
  );
}

export default Nav;
