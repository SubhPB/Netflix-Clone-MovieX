/* -- Byimaan -- */

import React , {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './style.scss';
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadingImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {

    const navigate = useNavigate();

    // holds the backgroung image of home...
    const [bgImg,setBgImg] = useState("");

    // holds data what the user is putting in search input...
    const [query,setQuery] = useState("");

    // selector...
    const {url} = useSelector( state => state.home );

    // using custom hook to data fetching logic...
    const [data,loading,error] = useFetch("/movie/popular");

    const handleQuerySearch = (e,wasClicked=false) => {

        // wasClicked determines whether user clicked on search button or pressed enter button...

        if ((e?.key === 'Enter' || wasClicked ) && query.trim().length){
            //  if everything is okay! then link the user to search page...
            navigate(`/search/${query.trim()}`);
            e.target.value = "";
        };
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect( () => {
        let bg;
        if (!error){
            // logic for the background image of the home page ...
            bg = url.backdrop + data?.results[Math.floor(Math.random()*20)]?.backdrop_path;
            setBgImg(bg);
        };
    },[data]);

    return (
        <div className="heroBanner">

            { 
                !loading &&
                <div className="backdrop-img">
                    <Img src={bgImg}/>
                </div>
            }

            <div className="opacity-layer">

            </div>

            <ContentWrapper>
                <div className="bannerContent">
                    <span className='title'>Welcome.</span>
                    <span className="subTitle"> Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className="searchInput">
                        <input type="text"
                            placeholder="Search for a movie or tv show..."
                            onKeyUp={handleQuerySearch}
                            onChange={handleChange}
                        />
                        <button onClick={ (e) => handleQuerySearch(e,true) }> Search </button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;