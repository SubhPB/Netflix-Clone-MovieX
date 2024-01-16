/* -- Byimaan -- */

import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchData } from './utils/api';
import SearchResult from './pages/search/SearchResult';

// imported an action...
import { getApiConfig, getGenres } from './store/homeSlice';

function App() {

  const dispatch = useDispatch();
  // const url = useSelector( state => state.home.url);

  const fetchApiConfig = () => {
    fetchData('/configuration').then( res => {

      // we are basically storing the api endpoints in store which can be used to get images related to posters, bg image etc...
      const urls = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };

      dispatch(getApiConfig(urls));
    })
  };

  const genresCall = async() => {
    let promises = [];
    let endPoints = ['tv','movie'];
    let allGenres = {};

    endPoints.forEach( url => {
      promises.push(fetchData(`/genre/${url}/list`))
    });

    const data = await Promise.all(promises);
    
    // data = [ {genres : [...]}. {genres: [...]} ]

    data?.map( ({genres}) => {
      // will apply nested map here..
      genres?.map( item => allGenres[item?.id] = item )
    });

    dispatch(getGenres(allGenres))

  };

  useEffect ( () => {
    fetchApiConfig();
    genresCall();
  },[])

  return (

    <BrowserRouter>

      <Header/>

        <Routes>
          <Route path="/" element={<Home/>}/>

          <Route path='/:mediaType/:id' element={<Details/>}/>

          <Route path='/explore/:mediaType' element={<Explore/>}/>

          <Route path='/search/:query' element={<SearchResult/>}/>

          <Route path='*' element={<PageNotFound/>}/>
          
        </Routes>
 
      <Footer/> 

    </BrowserRouter>
  );
} 
export default App;
