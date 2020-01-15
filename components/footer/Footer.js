import React from 'react';

import { FooterSection } from './footerSection/FooterSection';
import Copyright from './copyright/Copyright';
import Subscribe from './subscribe/Subscribe';

import './Footer.css';

 const Footer = () => {
    return(
        <footer id="footer">
            <Subscribe/>
            <FooterSection/>
            <Copyright/>
        </footer>
    )
}

export default Footer;