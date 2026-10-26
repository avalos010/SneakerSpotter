import Hero from "../../components/Hero/Hero";
import type { Theme } from "../../App";

function Home({ theme }: { theme: Theme }) {
  return (
    <>
      <Hero theme={theme} />
    </>
  );
}

export default Home;
