import { SET_LINZ_COUNT, SET_BOTH_EYE } from './action';

const defaultState = {
    leftEye : 0,
    rightEye : 0,
    leftCYL : -0.75,
    rightCYL : -0.75,
    leftAxis : 10,
    rightAxis : 10,
    leftBoxes : 1,
    rightBoxes : 1,
    BothEyesEye : 0,
    BothEyesCYL : -0.75,
    BothEyesAxis : 10,
    BothEyesBoxes : 1,
    bothEye : false,
    glassCount : 1,
    color: 'black'
}

const setLinzCount = (state = defaultState, action) => {
    switch (action.type) {
        case SET_LINZ_COUNT:
            return {
                ...state,
                [action.name] : action.payload
            }
        case SET_BOTH_EYE:
            return {
                ...state,
                bothEye : action.payload,
            }
        default: return {...state};
    } 
}

export default setLinzCount;

