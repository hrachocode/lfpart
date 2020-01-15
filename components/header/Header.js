import React from 'react';
import { TopBar } from './topBar/TopBar';
import  Navigation   from './navigation/Navigation';

import './Header.css';

const Header = () => {

    return(
        <header id="header">
            <TopBar/>
            <Navigation/>
        </header>
    )
}

export default Header;