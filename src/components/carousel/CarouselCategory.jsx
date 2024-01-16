/* -- Byimaan -- */


import React, {useState} from 'react';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import SwitchTabs from '../SwitchTabs/SwitchTabs';
import useFetch from '../../hooks/useFetch';
import Carousel from './Carousel';

function CarouselCategory({category}) {

    const endpoints = category.endpoints;
    const endpointKeys = Object.keys(category.endpoints);

    const [endpoint,setEndpoint] = useState(endpointKeys[0] ?? '');
    const [data,loading,error] = useFetch(endpoints[endpoint]);

    const handleTabChange = (tab,index) => {
        setEndpoint(tab)
    };

    return (
        <div className='carouselSection'>
            <ContentWrapper> 
                <span className="carouselTitle">
                    {category.title ?? 'Movix'}
                </span>
                { endpointKeys.length > 1 && <SwitchTabs data={endpointKeys} onTabChange={handleTabChange}/>}
            </ContentWrapper>

            <Carousel data={data?.results} loading={loading || error} mediaType={endpoint}/>
        </div>
    );
}

export default CarouselCategory;
