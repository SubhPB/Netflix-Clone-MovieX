/* -- Byimaan -- */

import React from 'react';
import './style.scss';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import ContentWrapper from '../contentWrapper/ContentWrapper';

const Footer = () => {
  return (
    <footer className='footer'>

      <ContentWrapper>

        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>

        <div className="infoText">
          Welcome to Movix, your premier destination for an unparalleled streaming experience! Crafted with passion,
          Movix offers a vast library of movies and TV shows, ensuring you're always just a click away from your next favorite story.
          Our platform is designed to bring the magic of cinema right into your home. Built using the latest in web technology,
          Movix leverages the robustness of Redux for state management and the agility of React for a seamless,
          interactive user interface. This combination ensures a fast, reliable, and intuitive browsing experience, 
          allowing you to dive into a world of entertainment with ease. Whether you're a movie buff or a series enthusiast,
          Movix is here to transform your viewing experience. Join us and embark on a cinematic journey like no other!
        </div>

        <div className="socialIcons">
          <span className="icon"> <FaFacebookF/> </span>
          <span className="icon"> <FaInstagram/> </span>
          <span className="icon"> <FaWhatsapp/> </span>
          <span className="icon"> <FaLinkedin/> </span>
        </div>

      </ContentWrapper>

    </footer>
  )
}

export default Footer;
