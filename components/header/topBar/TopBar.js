import React from 'react';
import TopBarEnd from './TopBarEnd';
import Country from './Country';

import './TopBar.css';

export const TopBar = () => {

    return(
        <section id="top-bar">
            <div>
                <Country/>
                <TopBarEnd/>
            </div>
        </section>
    )
}
