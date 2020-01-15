import { SET_SHOW_COUNT, SET_SHOW_SORT, SET_PRODUCTS, SET_LOADING, SET_PRODUCTS_LENGTH, SET_PATH, SET_PRODUCT_COST } from './action';

const defaultState = {
    count : 15,
    productsLength : 15,
    sort : 'Date',
    products : [],
    loading : true,
    path : false,
    productsCost : {
        min : 0,
        max : 1000000
    }
}

const setProductsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SHOW_COUNT:
            return {
                ...state,
                count : action.payload
            }
        case SET_SHOW_SORT:
            return {
                ...state,
                sort : action.payload
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products : action.payload,
            }
        case SET_LOADING:
            return {
                ...state,
                loading : action.payload,
            }
        case SET_PRODUCTS_LENGTH:
            return {
                ...state,
                productsLength : state.productsLength + action.payload
            }
        case SET_PATH:
            return {
                ...state,
                path : action.payload
            }
        case SET_PRODUCT_COST:
            return {
                ...state,
                productsCost : action.payload
            }
        default: return state;
    }
} 

export default setProductsReducer;


