
const initialState = {
    candies: [],
    loading: false,
    error: null,
};

const candiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'candies/fetchSuccess':
            return {
                ...state,
                candies: action.payload,
                loading: false,
                error: null,
            };
        case 'candies/fetchFailure':
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default candiesReducer;
