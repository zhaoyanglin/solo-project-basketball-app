const parkReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PARK':
            return state = action.payload;
        default:
            return state;
    }
};

export default parkReducer;