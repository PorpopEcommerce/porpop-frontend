import React from 'react';
import HeroSection from './LandingPage/Herosection';
import GlobalReachSection from './LandingPage/GlobalReachSection';
import KeyFeaturesSection from './LandingPage/KeyFeaturesSection'
import FeaturesAndMockupSection from './LandingPage/FeaturesAndMockupSection';
import FeaturesOverviewSection from './LandingPage/FeaturesOverviewSection';
import ProductHighlightSection from './LandingPage/ProductHighlightSection'
import CallToActionSection from './LandingPage/CallToActionSection';
import ThreeStepProcessSection from './LandingPage/ThreeStepProcessSection';


const LandingPage = () => {
    return (
        <main className="">
            <HeroSection />
            <GlobalReachSection />
            <KeyFeaturesSection />
            <FeaturesAndMockupSection />
            <FeaturesOverviewSection />
            <ProductHighlightSection />
            <CallToActionSection />
            <ThreeStepProcessSection />
        </main>
    );
};

export default LandingPage;
