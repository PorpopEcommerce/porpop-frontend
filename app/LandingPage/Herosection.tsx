import React from 'react';
import Heading from '../components/product/Heading';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section
            className="h-[400px] flex items-start justify-start bg-cover bg-center py-16 px-8"
            style={{
                backgroundImage: 'url("your-image-url.jpg")',
            }}
        >
            <div className="w-full max-w-[100rem] mx-auto grid lg:grid-cols-2 h-[100vh]">
                <div className=''>
                    <Heading title='Take your online order within minutes' />
                    <p className=''>Explore the most seamless method of conducting online sales without worrying about payment declines, We’ve got you covered!</p>

                </div>
                <div >
                    <img
                        src="https://porpop.com/wp-content/uploads//w-delivery-girl-opt-1536x1450.png" alt="Delivery Girl" 
                        className='w-full h-full'/>



                </div>
            </div>
        </section>
    );
};

export default HeroSection;
