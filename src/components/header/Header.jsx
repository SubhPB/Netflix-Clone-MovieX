/* -- Byimaan -- */

import React, {useState, useEffect} from "react";
import { HiOutlineSearch } from 'react-icons/hi';
import {SlMenu} from 'react-icons/sl';
import {VscChromeClose} from 'react-icons/vsc';
import {useNavigate} from 'react-router-dom';
import './style.scss';

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from '../../assests/movix-logo.svg';

const Header = () => {

    const [show,setShow] = useState('top');
    const [lastScrollY,setLastScrollY] = useState(0);
    const [mobileMenu,setMobileMenu] = useState(false);
    const [query,setQuery] = useState("");
    const [showSearch,setShowSearch] = useState("");

    const navigate = useNavigate();

    const openSearch = () => {

        setMobileMenu(false);
        setShowSearch(true);

    };

    const openMobileMenu = () => {

        setMobileMenu(true);
        setShowSearch(false);
    };

    const handleQuerySearch = (e) => {
        // wasClicked determines whether user clicked on search button or pressed enter button...
        if ((e?.key === 'Enter') && query.trim().length){
            //  if everything is okay! then link the user to search page...
            navigate(`/search/${query.trim()}`);
            e.target.value = "";

            setTimeout( () => {
                setShowSearch(false);
            },1100);
        };
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleNavigation = (type) => {
        switch (type) {
            case 'movie' : 
               navigate('/explore/movie');
               break;
            
            case 'tv' :
               navigate('/explore/tv');
               break;

            default: break;
        };
        setMobileMenu(false);
    };

    useEffect( () => {

        const handleView = () => {

            if (window.scrollY > 200){
                if (lastScrollY < window.scrollY && !mobileMenu && !showSearch){
                    setShow('hide');
                } else {
                    setShow('show');
                };
            } else { setShow('top') };
            setLastScrollY(window.scrollY)
        };

        window.addEventListener('scroll',handleView);

        return () => { 
            window.removeEventListener('scroll',handleView);
        };

    },[mobileMenu,showSearch,lastScrollY]);

    return (
        <header className={`header ${mobileMenu && "mobileView "} ${show}`}>
            <ContentWrapper>
                <div onClick={() => navigate('/')} className="logo">
                    <img src={logo} alt="logo-svg" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => handleNavigation('movie')}>Movies</li>
                    <li className="menuItem" onClick={() => handleNavigation('tv')}>Tv Shows</li>
                    <li className="menuItem"> <HiOutlineSearch onClick={openSearch}/> </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch}/>
                    {
                      mobileMenu ? 
                      <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu}/>
                    }
                </div>

            </ContentWrapper>

            { 
               showSearch && 
                <div className="searchBar">
                    <div className="searchInput">
                        <input type="text"
                            placeholder="what you are looking for? ..."
                            onKeyUp={handleQuerySearch}
                            onChange={handleChange}
                        />
                        <VscChromeClose onClick={() => setShowSearch(false)} />
                    </div>
                </div>
            }

        </header>
    )
};

export default Header;