import hero from "../../assets/hero.png";
import "./hero.css";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="inner-hero-container inner-gradient">
      <header className="inner-hero-container--header">
        <h1>Sneaker Spotter</h1>
      </header>

      <img src={hero} alt="photo of nike shoes" />

      <p>
        Search for all kinds of sneakers and find out where they are available
        at right now!
      </p>
      <Link className="btn" to="/popular">
        Explore Sneakers
      </Link>
    </div>
  );
}

export default Hero;
