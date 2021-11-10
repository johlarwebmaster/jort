import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                message: "Success!"
            };
        case 'BID_ITEM':
            return { ...state, [action.payload.id]: action.payload };
        case 'BID_TIME':
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};
