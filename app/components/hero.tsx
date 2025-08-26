"use client"

import React from 'react'
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { motion } from "framer-motion";
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react";



const Hero = () => {

const router = useRouter();
const {data: session} = useSession()

console.log(session)

  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
  };

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
    <div className='-mt-40 justify-center items-center text-center flex flex-col gap-1.5'>
  <h2 className="text-lg font-normal mb-5 text-white drop-shadow-lg max-w-[65%] ">
   Easily craft cinematic scenes, generate visuals with AI, refine them in real time, and store your favorites — all in one seamless creative workspace.
  </h2>
  
          <motion.div 
              variants={slideUp}
            transition={{ duration: 0.6 }}
                 initial="hidden" 
                  whileInView="show" 
                     viewport={{ once: true }}
                       >
            {
              session ? (
                <div className="flex gap-4 md:gap-10 text-sm flex-wrap justify-center">
                  <button onClick={()=>router.push('/dashboard')} className="bg-[#7D5FF3] hover:bg-[#7D5FF3]/80 px-3 py-2 cursor-pointer rounded-sm flex items-center gap-2">
                    Go to Dashboard <Send size={14} />
                  </button>

                  <button className="px-3 py-3 cursor-pointer  text-white bg-[#0A0A0A] hover:bg-[#2a2a2a] rounded-sm">
                    How it Works?
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 md:gap-10 text-sm flex-wrap justify-center">
                  <button className="bg-[#7D5FF3] hover:bg-[#7D5FF3]/80 px-3 py-2 cursor-pointer rounded-sm flex items-center gap-2">
                    Start Free Trial <Send size={14} />
                  </button>
                  <button className="px-3 py-3 cursor-pointer  text-white bg-[#0A0A0A] hover:bg-[#2a2a2a] rounded-sm">
                    How it Works?
                  </button>
                </div>
              )
            }
          </motion.div>

  </div>
</div>


    </div>
  )
}

export default Hero
