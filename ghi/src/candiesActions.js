export const fetchCandies = () => async dispatch => {
    try {

        const response = await fetch(`${process.env.REACT_APP_API_HOST}/candy`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch({ type: 'candies/fetchSuccess', payload: data });
    } catch (error) {
        console.error('Fetch error:', error);
        dispatch({ type: 'candies/fetchFailure', error: error.message });
    }
};
