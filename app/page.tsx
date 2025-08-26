import Image from "next/image";
import Hero from "./components/hero";
import LandingHeader from "./components/landingHeader";
import HowDoesItWorks from "./components/HowDoesItWorks";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <LandingHeader />
    <Hero/>
    <HowDoesItWorks/>
    <Footer/>
    </div>
  );
}
