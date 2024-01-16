/* -- Byimaan -- */

import React, {useEffect} from 'react';
import './style.scss';
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideoSection from './VideoSection/VideoSection';
import CarouselCategory from '../../components/carousel/CarouselCategory';

// -- 5: 38 -- // 

const Details = () => {

  const { mediaType, id } = useParams();

  const [vidData, vidLoading] = useFetch(`/${mediaType}/${id}/videos`);
  const [creditsData, creditsLoading] = useFetch(`/${mediaType}/${id}/credits`);

  const categories = [
    {title:'Recommendations',endpoints:{'favs':`/${mediaType}/${id}/recommendations`}},
    {title: 'Similars',endpoints:{'similars':`/${mediaType}/${id}/similar`}}
  ];

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  useEffect(() =>{
    scroll();
  },[mediaType,id]);

  return (
    <div>
      <DetailsBanner video={vidData?.results?.[0]} crew={creditsData?.crew}/>
      <Cast data={creditsData?.cast} loading={creditsLoading}/>
      <VideoSection data={vidData} loading={vidLoading}/>

      {
        categories.map( (cat,index) => <CarouselCategory key={index} category={cat}/>)
      }
    </div>
  )
}

export default Details;
