import Logo from "../../assets/logo.png";
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import "./nav.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import SearchOverlay from "../SearchOverlay/SearchOverlay";

function Nav() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const closeOverlay = () => {
    setShowSearchOverlay(false);
    setShowMobileNav(false);
  };

  return (
    <nav className="navigation-menu" aria-label="Main navigation">
      <Link className="navigation-menu--brand" to="/" onClick={() => setShowMobileNav(false)}>
        <img src={Logo} alt="" />
        <span>Sneaker<br />Spotter<span className="navigation-menu--dot">.</span></span>
      </Link>
      <div className={`navigation-menu--links ${showMobileNav ? "navigation-menu--links-show" : ""}`} id="main-navigation">
        <NavLink to="/" end onClick={() => setShowMobileNav(false)}>Home</NavLink>
        <NavLink to="/popular" onClick={() => setShowMobileNav(false)}>Popular</NavLink>
        <NavLink to="/sneakers/nike" onClick={() => setShowMobileNav(false)}>Nike</NavLink>
        <NavLink to="/sneakers/jordan" onClick={() => setShowMobileNav(false)}>Jordans</NavLink>
        <NavLink to="/sneakers/adidas" onClick={() => setShowMobileNav(false)}>Adidas</NavLink>
      </div>
      <div className="navigation-menu--actions">
        <button className="navigation-menu--search" type="button" aria-label="Search sneakers" onClick={() => setShowSearchOverlay(true)}><MagnifyingGlassIcon aria-hidden="true" /><span>Search</span></button>
        <button className="navigation-menu--toggle" type="button" aria-label={showMobileNav ? "Close menu" : "Open menu"} aria-expanded={showMobileNav} aria-controls="main-navigation" onClick={() => setShowMobileNav(!showMobileNav)}>{showMobileNav ? <XMarkIcon aria-hidden="true" /> : <Bars3Icon aria-hidden="true" />}</button>
      </div>
      {showSearchOverlay && <SearchOverlay closeOverlay={closeOverlay} />}
    </nav>
  );
}

export default Nav;
