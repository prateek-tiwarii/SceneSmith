"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Loading state (when NextAuth is still checking session)
  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0E0D13] text-white">
        <Loader2 className="animate-spin" size={30} />
      </div>
    );
  }

  // If user is logged in
  if (session) {
    return (
      <div className="flex h-screen w-screen bg-[#0E0D13] items-center justify-center">
        <div className="absolute top-6 left-10 text-[#F8F8F8]">
          <button
            className="px-2 py-1 rounded-sm text-sm hover:bg-[#0A0A0A]/50 flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            Go Back
          </button>
        </div>

        <div className="text-[#878593] border border-[#1B1A20] rounded-2xl bg-[#121117] flex flex-col items-center gap-5 w-full max-w-md px-5 py-8 z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-4">
          <img
            src={session.user?.image || "/profile.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full border border-[#1B1A20]"
          />
          <div className="text-lg text-white font-semibold">
            {session.user?.name}
          </div>
          <div className="text-sm text-gray-400">{session.user?.email}</div>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white w-full mt-4"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  // If user is not logged in
  return (
    <div className="flex h-screen w-screen bg-[#0E0D13] relative items-center justify-center">
      <div className="absolute top-6 left-10 text-[#F8F8F8]">
        <button
          className="px-2 py-1 rounded-sm text-sm hover:bg-[#0A0A0A]/50 flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
          Go Back
        </button>
      </div>

      <div className="text-[#878593] border border-[#1B1A20] rounded-2xl bg-[#121117] flex flex-col items-center gap-5 w-full max-w-md px-5 py-10 z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-4">
        <div className="text-2xl font-semibold text-[#F8F8F8]">
          Welcome to Scene-Smith
        </div>
        <div className="text-sm text-[#a3a3a3]">
          Login to your account with Google
        </div>

        <Button
          variant="default"
          className="bg-[#7D5FF3] hover:bg-[#7D5FF3]/90 transition-colors w-full mt-4"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
