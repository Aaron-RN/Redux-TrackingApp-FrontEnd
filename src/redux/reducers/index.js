import { combineReducers } from 'redux';
import userReducer from './user';
import foodsReducer from './foods';
import filterReducer from './filter';
import loaderReducer from './loader';

const rootReducer = combineReducers({
  user: userReducer,
  foods: foodsReducer,
  filter: filterReducer,
  status: loaderReducer,
});

export default rootReducer;
