/*  -- Byimaan -- */

import React from 'react';
import "./style.scss";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function Circlerating({rating}) {

    const chooseColor = () => rating < 5 ? 'red' : ( rating < 7 ? 'orange' : 'green' );

    return (
        <div className="circleRating">
            <CircularProgressbar 
            value={rating}
            maxValue={10}
            text={rating}
            styles={
                buildStyles({
                    pathColor: chooseColor(),
                })
            }
            />
        </div>
    )
}

export default Circlerating;
