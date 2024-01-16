/* -- Byimaan -- */

import React from "react";
import './style.scss';
import HeroBanner from "./heroBanner/HeroBanner";
import CarouselCategory from "../../components/carousel/CarouselCategory";

// -- 3:18:00 -- 
const Home = () => {

    const homeCategories = [
        {title:'Trending',endpoints:{"Day":'/trending/all/day',"Week":'/trending/all/week'}},
        {title:"What's popular?",endpoints:{"Movie":'/movie/popular',"Tv":'/tv/popular'}},
        {title:"Top Rated",endpoints:{"Movie":'/movie/top_rated',"Tv":'/tv/top_rated'}},
        {title:"Tv Series",endpoints:{"Today":'/tv/airing_today',"Upcoming":'/tv/on_the_air'}}
    ]

    return (
        <div className="homePage">
            <HeroBanner />
            {
                homeCategories.map( (category,index) => <CarouselCategory key={index} category={category} />)
            }
        </div>
    );
};

export default Home;