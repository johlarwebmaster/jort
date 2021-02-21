import items from "../apis/items";

export const signIn = (userId, firstName, lastName, fullName) => {
    return {
        type: 'SIGN_IN',
        payload: { userId, firstName, lastName, fullName }
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};

export const fetchItems = () => async dispatch => {
    const response = await items.get('/items');

    dispatch({ type: 'FETCH_ITEMS', payload: response.data });
};

export const fetchItem = (id) => async dispatch => {
    const response = await items.get(`/items/${id}`);

    dispatch({ type: 'FETCH_ITEM', payload: response.data });
};