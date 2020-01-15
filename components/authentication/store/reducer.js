import { SET_MODAL, LOADING, LOGIN } from './action';

let defaultValue = {
    modal : false,
    loading : false,
    userInside : false
}

const setModalReducer = (state = defaultValue, action) => {
    if(action.type===SET_MODAL){
        return {
            ...state,
            modal : action.payload
        }
    }
    if(action.type===LOADING){
        return{
            ...state,
            loading : action.payload
        }
    }
    if(action.type===LOGIN){
        return{
            ...state,
            userInside : action.payload
        }
    }
    return state;
} 

export default setModalReducer;


