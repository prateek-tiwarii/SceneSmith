"use client"

import React from 'react'
import { motion } from "framer-motion";




const HowDoesItWorks = () => {
  return (
     <div className="text-[#F8F8F8] -mt-32 px-4 md:px-6 py-20 flex bg-[#010213] flex-col gap-10 items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center z-10 flex flex-col gap-2"
        >
          <div className="text-2xl font-semibold tracking-tight">
            Watch How It Works
          </div>
          <p className="max-w-2xl mx-auto text-[#C7C8CC] text-sm">
            Explore how  Scene-Smith lets you generate Images Consistently — all in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-5xl md:rounded-xl rounded-md overflow-hidden shadow-xl z-10 border-2 border-[#4B4B4B] md:p-2 p-1"
        >
          <video
            src="/Demo.mp4"
            className="rounded-xl w-full h-auto opacity-80  shadow-lg"
            autoPlay
            loop
            muted
            controls={false}
          />
        </motion.div>
      </div>
  )
}

export default HowDoesItWorks