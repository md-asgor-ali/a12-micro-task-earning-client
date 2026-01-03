import React from 'react';
import Hero from '../../components/Hero';
import Testimonial from '../../components/Testimonial';
import HowItWorks from '../../components/HowItWorks';
import WhyChooseUs from '../../components/WhyChooseUs';
import FeaturedBuyers from '../../components/FeaturedBuyers';
import BestWorkers from '../../components/BestWorkers';
import HiveNewsletter from '../../components/HiveNewsletter';
import FAQ from '../../components/FAQ';
import SupportAndStats from '../../components/SupportAndStats';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <BestWorkers></BestWorkers>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
            <FAQ></FAQ>
            <SupportAndStats></SupportAndStats>
            {/* <WhyChooseUs></WhyChooseUs> */}
            {/* <FeaturedBuyers></FeaturedBuyers> */}
            {/* <HiveNewsletter></HiveNewsletter> */}
        </div>
    );
};

export default Home;