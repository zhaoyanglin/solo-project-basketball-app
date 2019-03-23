const userLocationReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER_LOCATION':
            return state = action.payload;
        default:
            return state;
    }
};

export default userLocationReducer;