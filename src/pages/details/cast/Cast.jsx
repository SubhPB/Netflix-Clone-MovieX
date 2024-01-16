/* -- Byimaan -- */

import React from 'react';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadingImage/Img';
import avatar from '../../../assests/avatar.png'

import './style.scss';

function Cast({data,loading}) {

    const {url} = useSelector( state => state.home )

    return (
        <div className="castSection">

            <ContentWrapper>
                <div className="sectionHeading"> Top Cast </div>

                { 
                    !loading ? (
                        <div className="listItems">
                            {
                                data?.map( item => {

                                    let imgUrl = item?.profile_path ? url.profile + item?.profile_path : avatar;

                                    return (
                                        <div className="listItem">

                                            <div className="profileImg">
                                                <Img src={imgUrl}/>
                                            </div>
                                            <div className="name">{item?.name}</div>
                                            <div className="character">
                                                { item?.character }
                                            </div>

                                        </div>
                                    );

                                })
                            }
                        </div>
                    ) 
                    : <CastSkeleton noOfItems={6}/>
                }
            </ContentWrapper>
        </div>
    );
};


export function CastSkeleton(noOfItems=1,shape='circle'){

    function SkeletonItem(){
        return (
            <div className="skItem">
                <div className={`${shape} skeleton`}></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (  
        Array(noOfItems).fill().map( (item,index) => (
            <SkeletonItem key={index}/>
        )) 
    );
}

export default Cast
