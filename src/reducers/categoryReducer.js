import * as actions from '../actions/types';

const initialState = {
    category: [],
    selectedCategory: 'Snack'
};

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.FETCH_CATEGORIES:
            return {
                ...state,
                category: action.payload
            };
        case actions.SET_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer