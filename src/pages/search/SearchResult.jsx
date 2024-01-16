/* -- Byimaan -- */

import React, {useState,useEffect} from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { fetchData } from '../../utils/api';
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchResult = () => {

  const [data,setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading,setLoading] = useState(false);
  const {query} = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then (
      res => {
        setData(res);
        setPageNum( prev => prev += 1);
        setLoading(false);
      }
    ). catch ( rej => {
      setData(null);
    })
  };

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(
      res => {
        if (data?.results){
          setData({
            ...data,
            results: [...data?.results, ...res?.results]
          })
        } else {
          setData(res);
        };
        setPageNum(prev => prev + 1);
      }
    ) .catch ( rej => {
      setLoading(true);
    })
  };

  useEffect( () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setPageNum(1);
    fetchInitialData();
  },[query]);

  return (
    <div className="searchResultsPage">
      {
        loading ?
        <Spinner />
        : (
          <ContentWrapper>
            {
              ((data?.results?.length ?? 0) > 0) ? (
                <React.Fragment>
                  <div className="pageTitle">
                    {`Search ${data?.total_results > 1 ? 'results' : 'result'} of '${query}'`}
                  </div>

                  <InfiniteScroll className='content' dataLength={data?.results?.length || 0} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner />}>
                    {
                      data?.results?.map( (item,index) => {
                        if (item?.media_type === 'person'){
                          return null;
                        } else {
                          return <MovieCard key={index} data={item} fromSearch={true} mediaType={item?.media_type}/>
                        } 
                      })
                    }
                  </InfiniteScroll>
                </React.Fragment>
              ) : (
                <span className='resultNotFound'>
                  Results not found...
                </span>
              )
            }
          </ContentWrapper>
        )
      }
    </div>
  )
}

export default SearchResult
