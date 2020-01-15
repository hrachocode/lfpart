import { SET_BROWSER_WIDTH } from './action';

const defaultState = {
    width : 0
}

const setWidthReducer = (state = defaultState, action) => {
    if(action.type === SET_BROWSER_WIDTH){
        return {
            width : action.payload
        }
    }    
    return state;
} 

export default setWidthReducer;