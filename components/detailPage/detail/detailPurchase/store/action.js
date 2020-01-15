export const SET_LINZ_COUNT = 'SET_LINZ_COUNT';
export const SET_BOTH_EYE = 'SET_BOTH_EYE';

export const setEyeCount = data => ({
    type : SET_LINZ_COUNT,
    payload : data.count,
    name : data.name
})

export const setBothEye = value => ({
    type : SET_BOTH_EYE,
    payload : value
})


