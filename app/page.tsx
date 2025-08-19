import Image from "next/image";
import Hero from "./components/hero";
import LandingHeader from "./components/landingHeader";

export default function Home() {
  return (
    <div>
      <LandingHeader />
    <Hero/>
    </div>
  );
}
