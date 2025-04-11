"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const HeroSection = () => {
  const token = Cookies.get('access_token')
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState("animate-floating");

  const getStartedClick = () => {
    if(token) {
      router.push('my_account')
    } else {
      toast.error('Please login or sign up to continue')
    }
  }

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
    <div className="h-[600px] relative overflow-hidden z-0 bg-black padding-x">
      {/* Background Image with Dynamic Animation */}
      <div
        className={`absolute inset-0 h-full w-screen overflow-hidden bg-cover bg-center transition-all duration-1000 ${currentAnimation}`}
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#4D702E] opacity-70 z-10" />

      {/* Content */}
      <div className="maxW relative inset-0 flex flex-col justify-center items-start text-left h-full text-white z-20 space-y-4">
        <h1 className="text-5xl">
          Start your online <br /> store today
        </h1>
        <p className="text-lg">
          Our easy-to-use platform makes it simple to create a <br />
          beautiful online store and start selling your product <br />
          to the world.
        </p>

        <button
          className="bg-[#A4CD3A] hover:bg-opacity-75 rounded py-3 px-10 text-[#006B6E] font-semibold"
          onClick={getStartedClick}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
