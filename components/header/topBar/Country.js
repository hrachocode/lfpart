import React from 'react';
import { Link } from 'react-router-dom';
import { HOC } from './HOC';


const Country = ({open, openList, changeList, changeOpen}) => {

    let  otherCountry;
    open ? otherCountry = 'Հայաստան' : otherCountry = 'England' 

    return(
        <div className="item-list" id="country">
            <span className="show-item" onClick={changeOpen}>
                <span id="location-is">Location is :</span> <span>{otherCountry}</span> 
            </span>
            {openList && <div className="dropdown-content" id="country-content">
                <Link 
                    onClick={changeList}
                    to="/"
                > 
                    {!open && <span>Հայաստան</span>}
                    {open && <span>England</span>}
                </Link>      
            </div>}
        </div>
    )
}

export default HOC(Country);



