export const SET_MODAL = 'SET_MODAL';
export const LOADING = 'LOADING';
export const LOGIN = 'LOGIN';


export const setModal = value => ({
    type : SET_MODAL,
    payload : value 
})

export const loading = value => ({
    type : LOADING,
    payload : value 
})

export const authentified = value => ({
    type : LOGIN,
    payload : value 
})
