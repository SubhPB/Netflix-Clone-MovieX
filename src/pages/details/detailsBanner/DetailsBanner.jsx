/*  -- Byimaan -- */

import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import './style.scss';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/Circlerating';
import Img from '../../../components/lazyLoadingImage/Img';
import PosterFallBack from '../../../assests/no-poster.png';
import {PlayIcon} from '../PlayIcon';
import VideoPopup from '../../../components/videoPopUp/VideoPopup';


// -- 5: 16 -- 

function DetailsBanner({video,crew}) {

    const [show,setShow] = useState(false);
    const [videoId,setVideoId] = useState(null);

    var { mediaType, id } = useParams();

    mediaType = mediaType === 'undefined' ? 'movie' : mediaType;

    const [data,loading,error] = useFetch(`/${mediaType}/${id}`);

    const {url} = useSelector( state => state.home );
    
    const _genres = data?.genres?.map( g => g?.id);

    const filmMakers = {
        director: crew?.filter( f => f?.job === 'Director'),
        writer: crew?.filter( f => f?.job === 'Screenplay' || f?.job === 'Writer'),
        
    };


    // --- from 24 to the 37 --- 

    const playVideo = () => {

        if (video?.key){
            setShow(true);
            setVideoId(video?.key);
        };
    };

    const toHoursAndMinutes = (data=0) => {
        const hours = ~~(data / 60);
        const minutes = data % 60;
        return  data ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` :'N/A'
    };

    return (
        <div className="detailsBanner">
            { !loading && !error ? (

                <React.Fragment>
                    <div className="backdrop-img">
                        <Img src={url?.backdrop + data?.backdrop_path}/>
                    </div>
                    <div className="opacity-layer"/>

                    <ContentWrapper>

                        <div className="left">
                            {
                               data?.poster_path ? (
                                  <Img className='posterImg' src={url?.backdrop + data?.poster_path}/>
                               ) : (
                                <Img className='posterImg' src={PosterFallBack}/>
                               ) 
                            }
                        </div>

                        <div className="right">

                            {/* <div className="title">
                               {`${data?.name || data?.name} (${data?.release_date?.format("YYYY")}) `} 
                            </div> */}

                            <div className="subtitle">
                                {data?.tagline}
                            </div> 

                            <Genres data={_genres}/>

                            <div className="row">
                                <CircleRating  rating={data?.vote_average?.toFixed(1)}/>
                                <div className="playbtn" onClick={playVideo}>
                                    <PlayIcon />
                                    <span className="text"> Watch Trailer </span>
                                </div>
                            </div>

                            <div className="overview">
                                <div className="heading"> Overview </div>
                                <div className="description">
                                    {data?.overview}
                                </div>
                            </div>

                            <div className="info">
                                {
                                    data?.status && (
                                        <div className="infoItem">
                                            <div className="text bold">
                                                Status: {" "}
                                            </div>
                                            <div className="text">
                                                {data?.status}
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    data?.release_date && (
                                        <div className="infoItem">
                                            <div className="text bold">
                                                Released Date: {" "}
                                            </div>
                                            <div className="text">
                                                {dayjs(data?.release_date).format("MMM D, YYYY")}
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    data?.runtime && (
                                        <div className="infoItem">
                                            <div className="text bold">
                                                Runtime: {" "}
                                            </div>
                                            <div className="text">
                                                {toHoursAndMinutes(data?.runtime)}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            {/* --- cast and crew --- */}

                            {
                               filmMakers?.director?.length > 0 &&  (
                                <div className="info">
                                    <div className="text bold">
                                        Director : {" "}
                                    </div>
                                    <div className="text">
                                        {
                                            filmMakers?.director?.map((d,i) => (
                                                <span key={i}> 
                                                   {d?.name}
                                                   {d?.length - 1 !== i && ", "}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                               )
                            }

                            {
                               filmMakers?.writer?.length > 0 &&  (
                                <div className="info">
                                    <div className="text bold">
                                        Writer : {" "}
                                    </div>
                                    <div className="text">
                                        {
                                            filmMakers?.writer?.map((d,i) => (
                                                <span key={i}> 
                                                   {d?.name}
                                                   {d?.length - 1 !== i && ", "}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                               )
                            }

                            {
                               data?.created_by?.length > 0 &&  (
                                <div className="info">
                                    <div className="text bold">
                                        Creator : {" "}
                                    </div>
                                    <div className="text">
                                        {
                                            data?.created_by?.map((d,i) => (
                                                <span key={i}> 
                                                   {d?.name}
                                                   {d?.length - 1 !== i && ", "}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                               )
                            }
                        </div>

                        <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>

                    </ContentWrapper>
                </React.Fragment>

            )  : <DetailsBannerSkeleton/>}
        </div>
    );
}


function DetailsBannerSkeleton(){

    return (
        <div className="detailsBannerSkeleton">
        <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
            </div>
        </ContentWrapper>
        </div>
    )
};

export default DetailsBanner;
