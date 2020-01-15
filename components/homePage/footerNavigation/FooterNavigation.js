import React from 'react';
import { Link } from 'react-router-dom';
import './FooterNavigation.css';
import arrow from './icons/play-button-black.png';

const FooterNavigation = () => {
    return(
        <ul className="list-group">
            <Link to="/products/filter/%7B%7D" className="list-group-item d-flex justify-content-between align-items-center">
                ԱԿՆՈՑՆԵՐ
                <span><img src={arrow} alt=""/></span>
            </Link>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                ԿՈՆՏԱԿՏԱՅԻՆ ՈՍՊՆՅԱԿՆԵՐ
                <span><img src={arrow} alt=""/></span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                ԱԿՆՈՑԱՅԻՆ ՈՍՊՆՅԱԿՆԵՐ
                <span><img src={arrow} alt=""/></span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                ԽՆԱՄՔ
                <span><img src={arrow} alt=""/></span>
            </li>
        </ul>
    )
}

export default FooterNavigation