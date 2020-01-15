import { SET_BASCET_COUNT, SET_WISHLIST_COUNT } from './action';

let defaultState = {
    basket : 0,
    wishlist : 0,
}

const basketWishCount = (state = defaultState, action) => {
     if(action.type===SET_BASCET_COUNT){
        return{
            ...state,
            basket : action.payload
        }
     }
     if(action.type===SET_WISHLIST_COUNT){
        return{
            ...state,
            wishlist : action.payload
        }
     }
     return state;
}

export default basketWishCount;