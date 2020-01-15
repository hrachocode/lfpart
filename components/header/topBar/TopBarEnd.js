import React from 'react';
import { Link } from 'react-router-dom';
import { HOC } from './HOC';
import arm from './icons/armenia.png';
import uk from './icons/united-kingdom.png';
import user from './/icons/user.png';


const TopBarEnd = ({open, openList, changeList, changeOpen}) => {

    let lang ;
    open ? lang = arm : lang = uk;

    return(
        <div className="item-list" id="TopBarEnd">
            <span className="show-item" onClick={changeOpen}>
                <img src={lang} alt=""/>
            </span>
            {openList && <div className="dropdown-content" id="flag-content">
                <Link onClick={changeList} to="/">
                    {!open && <img src={arm} alt=""/>}
                    {open && <img src={uk} alt=""/>}
                </Link>  
            </div>}
            <Link className="login-icon" to={localStorage.token ? '/account' : '/authentication'}><img src={user} alt=""/></Link>
        </div>
    )
}

export default HOC(TopBarEnd)

