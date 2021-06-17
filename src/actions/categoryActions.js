import * as actions from './types';

export const setCategory = (category) => {
    console.log('setting category to: ', category);

    return {
        type: actions.SET_CATEGORY,
        payload: category
    }
};

export const fetchCategories = () => {
    const categories = ['Snack', 'Drink', 'Entry'];
    return {
        type: actions.FETCH_CATEGORIES,
        payload: categories
    }
};