"use client";

import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState("animate-floating");

  const images = [
    "/Images/Hero/hero_1.png",
    "/Images/Hero/hero_2.png",
    "/Images/Hero/hero_3.png",
    "/Images/Hero/hero_4.png",
    "/Images/Hero/hero_5.png",
    "/Images/Hero/hero_6.png",
    "/Images/Hero/hero_7.png",
  ];

  const animations = [
    "animate-floating",
    "animate-pulseScale",
    "animate-swinging",
    "animate-zoomFade",
    "animate-spinInOut",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through images and animations
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      setCurrentAnimation(() => {
        const randomIndex = Math.floor(Math.random() * animations.length);
        return animations[randomIndex];
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [images.length, animations.length]);

  return (
    <div className="h-screen relative overflow-hidden -mt-24 z-0 bg-black">
      {/* Background Image with Dynamic Animation */}
      <div
        className={`absolute inset-0 h-full w-full bg-cover bg-center transition-all duration-1000 ${currentAnimation}`}
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#4D702E] opacity-70 z-10" />

       {/* Content */}
       <div className="absolute inset-0 flex flex-col justify-start items-start text-left h-full text-white px-6 z-20 mt-64 ml-16 space-y-4">
        <h1 className="text-4xl font-bold">
          Start your online <br /> store today
        </h1>
        <p className="text-lg">
          Our easy-to-use platform makes it simple to create a <br />
          beautiful online store and start selling your product <br />
          to the world.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
