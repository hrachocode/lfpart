export const SET_SHOW_COUNT = 'SET_SHOW_COUNT';
export const SET_SHOW_SORT = 'SET_SHOW_SORT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_PRODUCTS_LENGTH = 'SET_PRODUCTS_LENGTH';
export const SET_PRODUCT_COST = 'SET_PRODUCT_COST';
export const SET_PATH = 'SET_PATH';

export const setShowCount = count => ({
    type : SET_SHOW_COUNT,
    payload : count,
})

export const setShowSort = sort => ({
    type : SET_SHOW_SORT,
    payload : sort,
})

export const setProducts = products => ({
    type : SET_PRODUCTS,
    payload : products,
})

export const setLoading = loading => ({
    type : SET_LOADING,
    payload : loading,
    
})

export const setProductsLength = length => ({
    type : SET_PRODUCTS_LENGTH,
    payload : length,
})

export const setPath = path => ({
    type : SET_PATH,
    payload : path,
})

export const setProductCost = cost => ({
    type : SET_PRODUCT_COST,
    payload : cost,
})