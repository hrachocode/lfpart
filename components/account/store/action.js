export const SET_BASCET_COUNT = 'SET_BASCET_COUNT';
export const SET_WISHLIST_COUNT = 'SET_WISHLIST_COUNT';

export const setBasketCount = count => ({
    type : SET_BASCET_COUNT,
    payload : count
})

export const setWishlistCount = count => ({
    type : SET_WISHLIST_COUNT,
    payload : count
})