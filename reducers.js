import { combineReducers } from 'redux';
import width from './browserWidth/store/reducer';
import banners from './development/store/reducer';
import products from './components/products/store/reducer';
import modal from './components/authentication/store/reducer';
import linzCount from './components/detailPage/detail/detailPurchase/store/reducer';
import basketWishCount from './components/account/store/reducer';

export default combineReducers({
    width,
    banners,
    products,
    modal,
    linzCount,
    basketWishCount
})