/* -- Byimaan -- */

import React from "react";
import ReactPlayer from "react-player";
import './style.scss';

function VideoPopup({show, setShow, videoId, setVideoId}) {

    const hidePopUp = () => {
        setShow(false); setVideoId(false);
    };

    return (
        <div className={`videoPopup ${show ? 'visible': ""}`}>
            <div className="oapcityLayer" onClick={hidePopUp}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopUp}> Close </span>
                <ReactPlayer 
                   url={`https:www.youtube.com/watch?v=${videoId}`}
                   controls
                   width='100%'
                   height='100%'
                />
            </div>
        </div>
    );}

export default VideoPopup;
