"use client"

import React, { use } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const LandingHeader = () => {

  const router = useRouter();
  const { data: session, status } = useSession();


  return (
    <div className="max-w-6xl mx-auto mt-6 px-6 py-3 flex items-center justify-between 
      bg-gradient-to-r from-[#030416] to-[#11111F] border border-white rounded-3xl 
      text-white shadow-lg">
      
      
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Scene Smith Logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-xl font-bold">SceneSmith</h1>
      </div>

      
      <div>
        <ul className="flex gap-5 text-sm font-medium">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="https://github.com/prateek-tiwarii" className="hover:underline">Github</a></li>
          <li><a href="#" className="hover:underline">Pro</a></li>
          <li><a href="#" className="hover:underline">Features</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
          <li><a href="#" className="hover:underline">Pricing</a></li>
        </ul>
      </div>

      
      <div>
        <a onClick={ () =>router.push('/signIn')} className="hover:underline text-sm font-medium">
          {session ? "LogOut" : "Login/Signup"}
        </a>
      </div>
    </div>
  )
}

export default LandingHeader
