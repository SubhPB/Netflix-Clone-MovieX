/* -- Byimaan -- */ 

import './style.scss';
import React, {useState} from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import VideoPopup from '../../../components/videoPopUp/VideoPopup';
import Img from '../../../components/lazyLoadingImage/Img';
import { PlayIcon } from '../PlayIcon';
import { CastSkeleton } from '../cast/Cast';

function VideoSection({ data, loading }) {
    
  const [show,setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  function VideoItem({video}){

    const handleClick = () => {
      if (video?.key){
        setVideoId(video?.key); 
        setShow(true);
      };
    };

    return (
      <div onClick={handleClick} className="videoItem">
        <div className="videoThumbnail">
          <Img src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}/>
          <PlayIcon />
        </div>
        <div className="videoTitle">{video?.name}</div>
      </div>
    );
  };

  return (
    <div className='videosSection'>
      <ContentWrapper>
        <div className="sectionHeading"> Official Videos </div>
        {
          !loading ? (
            <div className="videos">

              {
                data?.results?.map( (video,index) => (
                  <VideoItem key={index} video={video}/>
                ))
              }

            </div>
          ) :
          <VideoSkeleton />
        }
      </ContentWrapper>

      <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>

    </div>
  )
};



function VideoSkeleton(){

  return (
    <CastSkeleton noOfItems={4} shape={'thumb'}/>
  );
}

export default VideoSection;
