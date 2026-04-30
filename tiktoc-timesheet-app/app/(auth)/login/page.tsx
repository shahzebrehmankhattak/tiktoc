"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    console.log(res);
  };

 return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white order-2 md:order-1">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            Welcome back
          </h1>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition"
            />
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            Remember me
          </label>

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            className="cursor-pointer w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-lg text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-blue-600 flex items-center justify-start px-8 py-10 md:px-16 order-1 md:order-2 relative overflow-hidden min-h-[220px] md:min-h-screen hidden  md:block">
        {/* Decorative circles */}
        <div className="absolute w-80 h-80 bg-white/5 rounded-full -top-20 -right-20 pointer-events-none" />
        <div className="absolute w-52 h-52 bg-white/5 rounded-full -bottom-10 -left-10 pointer-events-none" />

        <div className="relative z-10 max-w-sm md:top-20 lg:top-40">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            ticktock
          </h2>
          <p className="text-white/85 text-sm md:text-base leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );

}