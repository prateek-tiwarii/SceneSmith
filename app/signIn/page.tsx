"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch {
      console.error("Google login failed");
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Show loading while session is being fetched
  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-white">
        <Loader2 className="animate-spin" size={30} />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#0E0D13] relative items-center justify-center">
      {/* Back button */}
      <div className="absolute top-6 left-10 text-[#F8F8F8]">
        <button
          className="px-2 py-1 rounded-sm text-sm hover:bg-[#0A0A0A]/50 flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
          Go Back
        </button>
      </div>

      {/* Overlay blur */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* Auth card */}
      <div className="text-[#878593] border border-[#1B1A20] rounded-2xl bg-[#121117] flex flex-col items-center gap-5 w-full max-w-md px-5 py-6 z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-4">
        {session ? (
          // Logged in
          <div className="flex flex-col items-center gap-4">
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
              variant="default"
              className="bg-red-600 hover:bg-red-500 w-full mt-4"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          // Not logged in
          <>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold text-[#F8F8F8]">
                Welcome to Scene-Smith
              </div>
              <div className="text-sm text-[#a3a3a3]">
                Login to your account with Google
              </div>
            </div>

            {/* Disabled input fields */}
            <div className="w-full flex flex-col gap-3">
              <Input
                type="text"
                placeholder="Enter Email"
                value="(login via Google)"
                readOnly
                className="w-full border-[#1B1A20] bg-[#0E0D13] text-gray-500"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value="******"
                  readOnly
                  className="w-full border-[#1B1A20] bg-[#0E0D13] text-gray-500 pr-10"
                />
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-300 transition-colors"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            {/* Google button */}
            <Button
              variant="default"
              className="bg-[#7D5FF3] hover:bg-[#7D5FF3]/90 transition-colors w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign in with Google"
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;



