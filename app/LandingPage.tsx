import React from "react";
import HeroSection from "./LandingPage/Herosection";
import FeaturedStoresSection from "./LandingPage/FeaturedStoresSection";
import UpdatesSection from "./LandingPage/UpdatesSection";
import ReviewsSection from "./LandingPage/ReviewsSection";
import HelpfulResources from "./LandingPage/HelpfulResources";
import OurStory from "./LandingPage/OurStory";
import Map from "./LandingPage/Map";
import PromoteBusiness from "./LandingPage/PromoteBusiness";
import CTO from "./LandingPage/CTO";
import Stat from "./LandingPage/Stat";
import Advantages from "./LandingPage/Advantages";
import FeaturedProducts from "./LandingPage/FeaturedProducts";
import Support from "./LandingPage/Support";
import StartSelling from "./LandingPage/StartSelling";
import Footer from "./LandingPage/Footer";

const LandingPage = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <FeaturedStoresSection />
      <ReviewsSection />
      <UpdatesSection />
      <section className="bg-black">
        <HelpfulResources />
        <OurStory />
        <Map />
        <PromoteBusiness />
      </section>
      <section className="bg-[#255200]">
        <CTO />
        <Stat />
        <Advantages />
        <FeaturedProducts />
      </section>
      <section className="bg-black">
        <Support />
        <StartSelling />
        <Footer />
      </section>
    </main>
  );
};

export default LandingPage;
