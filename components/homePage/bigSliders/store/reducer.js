import { SET_BIG_SLIDER_IMAGES } from './action';

const defaultState = {
    images : []
}

const setProductsReducer = (state = defaultState, action) => {
    if(action.type=== SET_BIG_SLIDER_IMAGES){
        return {
            ...state,
            images : action.images
        }
    }
    return state;
} 

export default setProductsReducer;


