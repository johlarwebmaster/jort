const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    firstName: null,
    lastName: null,
    fullName: null,
    email: null,
    imageUrl: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {...state, isSignedIn: true, userId: action.payload.userId, firstName: action.payload.firstName, lastName: action.payload.lastName, fullName: action.payload.fullName, email: action.payload.email, imageUrl: action.payload.imageUrl };
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, userId: null, firstName: null, lastName: null, fullName: null, email: null };
        default:
            return state;
    }
};
