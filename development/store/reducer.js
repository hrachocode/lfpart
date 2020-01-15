import { BANNERS_PHOTO_FETCH } from './action';

let defaultState = {
    photo : []
}

const bannersPhotoReducer = (state = defaultState, action) => {
    if(action.type === BANNERS_PHOTO_FETCH){
        return {
            photo : action.payload
        }
    }
    return state;
}

export default bannersPhotoReducer;