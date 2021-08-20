import items from "../apis/items";

export const signIn = (userId, firstName, lastName, fullName, email, imageUrl) => {
    return {
        type: 'SIGN_IN',
        payload: { userId, firstName, lastName, fullName, email, imageUrl }
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};

export const fetchItems = () => async dispatch => {
    const response = await items.get('/items.json');

    dispatch({ type: 'FETCH_ITEMS', payload: response.data });
};

export const fetchItem = (id) => async dispatch => {
    const response = await items.get(`/items/${id}.json`);

    dispatch({ type: 'FETCH_ITEM', payload: response.data });
};

export const addItem = formValues => async dispatch => {
    items.post('/items.json', formValues);
};

export const bidItem = (id, itemValues) => async dispatch => {
    const response = await items.patch(`/items/${id}.json`, itemValues);

    dispatch({ type: 'BID_ITEM', payload: response.data });  
};
