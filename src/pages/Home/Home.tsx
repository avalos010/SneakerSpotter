import Hero from "../../components/Hero/Hero";
import type { Theme } from "../../App";
import { Link } from "react-router-dom";

function Home({ theme }: { theme: Theme }) {
  return (
    <>
      <Hero theme={theme} />
      <section className="home-guide" aria-labelledby="home-guide-title">
        <div>
          <span className="eyebrow">FIND YOUR PAIR</span>
          <h2 id="home-guide-title">Find sneakers. Compare your options.</h2>
          <p>Explore popular sneakers and compare available prices and sizes from GOAT, Flight Club, Stadium Goods, and StockX. Choose a pair to see the sizes and seller listings available for that shoe.</p>
        </div>
        <div className="home-guide--links" aria-label="Explore sneaker collections">
          <Link to="/popular">Popular sneakers <span aria-hidden="true">↗</span></Link>
          <Link to="/sneakers/nike">Nike sneakers <span aria-hidden="true">↗</span></Link>
          <Link to="/sneakers/jordan">Jordan sneakers <span aria-hidden="true">↗</span></Link>
          <Link to="/sneakers/adidas">adidas sneakers <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}

export default Home;
