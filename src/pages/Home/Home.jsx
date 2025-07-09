import React from 'react';
import Hero from '../../components/Hero';
import Testimonial from '../../components/Testimonial';
import HowItWorks from '../../components/HowItWorks';
import WhyChooseUs from '../../components/WhyChooseUs';
import FeaturedBuyers from '../../components/FeaturedBuyers';
import BestWorkers from '../../components/BestWorkers';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <BestWorkers></BestWorkers>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
            <FeaturedBuyers></FeaturedBuyers>
        </div>
    );
};

export default Home;