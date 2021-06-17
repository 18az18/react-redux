import { combineReducers } from 'redux';

import itemReducer from './itemReducer'
import categoryReducer from './categoryReducer'
import userReducer from './userReducer';
// import postReducer from './postReducer';

const rootReducer = combineReducers({
   items: itemReducer,
   category: categoryReducer,
   user: userReducer
});

export default rootReducer