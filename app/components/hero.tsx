import React from 'react'
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center px-4 pt-12"> 
      {/* Welcome Text */}
      <div className="my-3 text-center">
        <p className="text-xs md:text-base text-gray-200 border p-1 border-gray-600 rounded-2xl pb-2">
          Welcome to The future of Image Generation |{" "}
          <AnimatedGradientText>Read More →</AnimatedGradientText>
        </p>
      </div>

      {/* Hero Image */}
      <div >
        <img 
          src="/Hero.png" 
          alt="Hero Image" 
          className="max-w-xs md:max-w-sm rounded-lg"
        />
      </div>

      <p className="text-5xl md:w-xl text-center font-['Inter'] -my-24 mb-1 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
  Craft, Collaborate, Create Your Perfect Scene.
</p>


     <div
  className="relative w-full h-64 md:h-80 flex flex-col justify-center items-center text-center rounded-lg overflow-hidden"
  style={{
    backgroundImage: `url('/Frame.png')`,
    backgroundPosition: 'center',
    backgroundSize: '60% 100%', // slightly wider and taller
    backgroundRepeat: 'no-repeat',
  }}
>
    <div className='-mt-36 justify-center items-center text-center flex flex-col gap-1.5'>
  <h2 className="text-base md:text-xl font-semibold mb-1 text-[#807DFF] drop-shadow-lg max-w-[80%] ">
    Begin your creative journey today and bring your ideas to life
  </h2>
  
  <RainbowButton>Get Started</RainbowButton>

  </div>
</div>


    </div>
  )
}

export default Hero
