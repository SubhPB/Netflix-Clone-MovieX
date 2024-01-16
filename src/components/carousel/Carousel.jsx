/* -- Byimaan -- */


import React, {useRef} from 'react';
import './style.scss';

import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadingImage/Img';
import posterFallback from '../../assests/no-poster.png';
import dayjs from 'dayjs';
import CircleRating from '../circleRating/Circlerating';
import Genres from '../genres/Genres';

// -- 4: 15: 02 --

function Carousel({data,loading,mediaType}) {

    const carouselContainer = useRef(null);
    const {url} = useSelector( state => state.home );
    const navigate = useNavigate();

    const handleArrowClick = (direction) => {

        const container = carouselContainer.current;

        let scrollAmount
        if (container){
            switch (direction) {
                case 'left': scrollAmount = container.scrollLeft - container.offsetWidth - 20; 
                    break; 
                case 'right': scrollAmount = container.scrollLeft + container.offsetWidth + 20;
                    break;
                default: scrollAmount = 0;
                    break;
            };
            container.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            })
        };
        
    };


    const handleNavigation = (item) => {

        mediaType = mediaType.toLowerCase();

        const endpoint = ( () => {
            if (item?.media_type){ 
                return item?.media_type
            } else {
                return ['tv','movie'].includes(mediaType) ? mediaType : 'tv';
            }
        })();

        navigate(`/${endpoint}/${item?.id}`);
    }

    return (
        <div className="carousel">
            <ContentWrapper>

                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => handleArrowClick('left')}/>

                <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => handleArrowClick('right')}/>

                { 
                  !loading ? (() => {
                    return (
                        <div className="carouselItems"  ref={carouselContainer}>
                            {
                                data?.map( (item) => {

                                    const posterUrl = item?.poster_path ? url.poster+item.poster_path : posterFallback;
                                    
                                    return (
                                    <div key={item.id} className="carouselItem" onClick={() => handleNavigation(item)}>
                                            <div className="posterBlock">
                                                <Img src={posterUrl}/>
                                                <CircleRating rating={item?.vote_average.toFixed(1)}/>
                                                <Genres data={item?.genre_ids}/>
                                            </div>
                                            <div className="textBlock">
                                                <span className="title">
                                                    {item?.title || item?.name}
                                                </span>
                                                <span className="date">
                                                    {dayjs(item?.release_Date).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                    </div>
                                    );
                                })
                            }
                        </div>
                    );
                  })(): (
                        <div className="loadingSkeleton">
                            { Array(6).fill(0).map( (item,index) => <SkeletonItem key={index}/>)}
                        </div>
                    )
                }

            </ContentWrapper>
        </div>
    );
};

function SkeletonItem() {
    //  in the case of loading it will show the skeleton of poster just for animation...
    return (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"/>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );
};

export default Carousel;
