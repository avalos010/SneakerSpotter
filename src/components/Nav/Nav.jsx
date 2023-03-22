import Logo from "../../assets/logo.png";
import { Bars3Icon } from "@heroicons/react/24/solid";
import "./nav.css";
function Nav() {
  return (
    <nav className="navigation-menu">
      <div className="navigation-menu--mobile">
        <Bars3Icon className="navigation-menu--icon" />
        <img src={Logo} alt="logo of shoes" />
      </div>
      <ul className="navigation-menu--links">
        <li>Nike</li>
        <li>Jordans</li>
        <li>Adidas</li>
      </ul>
    </nav>
  );
}

export default Nav;
