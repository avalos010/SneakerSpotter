import blackShoe from "../../assets/air-force-1-black.jpg";
import whiteShoe from "../../assets/air-force-1-white.png";
import type { Theme } from "../../App";
import "./hero.css";
import { Link } from "react-router-dom";

function Hero({ theme }: { theme: Theme }) {
  return (
    <div className="home-page">
      <section className="inner-hero-container">
        <div className="hero-copy">
          <span className="eyebrow"><span /> Your next pair is out there</span>
          <h1>Sneaker<br /> <em>Spotter.</em></h1>
          <p>Find the sneakers you love and compare prices from your favorite marketplaces, all in one place.</p>
          <Link className="btn hero-cta" to="/popular">Explore sneakers <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-visual">
          <div className="hero-visual--orbit" aria-hidden="true" />
          <span className="hero-visual--label">THE SEARCH<br />IS ON <span>↗</span></span>
          <img className={theme === "dark" ? "hero-visual--white-shoe" : "hero-visual--black-shoe"} src={theme === "dark" ? whiteShoe : blackShoe} alt={`${theme === "dark" ? "White" : "Black"} Nike Air Force 1 sneaker`} />
          <span className="hero-visual--caption">FIND YOUR PAIR / COMPARE YOUR OPTIONS</span>
        </div>
      </section>
      <div className="home-note"><span>MADE FOR THE SNEAKER SEARCH</span><span>DISCOVER <b>✳</b> COMPARE <b>✳</b> FIND YOUR PAIR</span></div>
    </div>
  );
}

export default Hero;
