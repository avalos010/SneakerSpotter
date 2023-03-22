import hero from "../../assets/hero.png";
import "./hero.css";
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
      <button className="">Explore Sneakers</button>
    </div>
  );
}

export default Hero;
