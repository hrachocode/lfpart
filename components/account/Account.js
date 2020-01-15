import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderHistory from './orderHistory/OrderHistory';
import PersonalInfo from './personalInfo/PersonalInfo';
import Basket from './basket/Basket';
import Wishlist from './wishlist/Wishlist';
import { setBasketCount, setWishlistCount } from './store/action';
import { authentified } from '../authentication/store/action';
import './Account.css';

const Account = props => {
    const {pathname} = props.location;
    
    if(!localStorage.token){    
        props.history.replace('/authentication');
        return false;
    }

    const logout = () => {
        props.setBasketCount(0);
        props.setWishlistCount(0);
        props.authentified(false);
        localStorage.clear();
        props.history.replace('/');
    }

    return pathname === '/account' ? 
    (
        <div id="account">
            <div id="account-title">
                <h2>Իմ հաշիվը</h2>
                <p>Բարի գալուստ Ձեր հաշիվ: Այստեղ Դուք կարող եք կառավարել Ձեր անձնական տվյալները և պատվերները:</p>
            </div>
            <div id="account-options">
                <Link to="/account/personal-info">Իմ անձնական տվյալները</Link>
                <Link to="/account/order-history">Պատվերների պատմություն և մանրամասներ</Link>
                <Link to="/account/wishlist">Իմ Ցանկությունների ցուցակը</Link>
                <div onClick={logout}>Ելք</div>
            </div>
        </div>
    ) : pathname === '/account/order-history' ? 
    <OrderHistory/> : pathname === '/account/personal-info' ? 
    <PersonalInfo/> : pathname === '/account/basket' ? 
    <Basket/> : pathname === '/account/wishlist' ?
    <Wishlist history={props.history}/> : null;
}

const mapDispatchToProps = {
    setBasketCount,
    setWishlistCount,
    authentified
}

export default withRouter(connect(null, mapDispatchToProps)(Account));
