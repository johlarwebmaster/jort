const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    firstName: null,
    lastName: null,
    fullName: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {...state, isSignedIn: true, userId: action.payload.userId, firstName: action.payload.firstName, lastName: action.payload.lastName, fullName: action.payload.fullName };
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, userId: null, firstName: null, lastName: null, fullName: null };
        default:
            return state;
    }
};
