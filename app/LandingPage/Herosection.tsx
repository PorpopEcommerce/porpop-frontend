import React from 'react';

const HeroSection = () => {
    return (
        <section
            className="h-[400px] flex items-start justify-start bg-cover bg-center text-white py-16 px-8"
            style={{
                backgroundImage: 'url("your-image-url.jpg")',
            }}
        >
            <div className="max-w-lg">
                <h1 className="text-4xl font-bold mb-4">
                    Your Heading Here
                </h1>
                <p className="text-lg">
                    This is the paragraph content for the second section. It will appear below the heading and to the left side of the section.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
