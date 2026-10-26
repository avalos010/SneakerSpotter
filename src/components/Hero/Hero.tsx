import hero from "../../assets/hero.png";
import "./hero.css";
import { Link } from "react-router-dom";

function Hero() {
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
          <img src={hero} alt="Nike sneaker in black, white, and orange" />
          <span className="hero-visual--caption">FIND YOUR PAIR / COMPARE YOUR OPTIONS</span>
        </div>
      </section>
      <div className="home-note"><span>MADE FOR THE SNEAKER SEARCH</span><span>DISCOVER <b>✳</b> COMPARE <b>✳</b> FIND YOUR PAIR</span></div>
    </div>
  );
}

export default Hero;
