import { combineReducers } from 'redux';
import foodsReducer from './foods';
import filterReducer from './filter';
import loaderReducer from './loader';

const rootReducer = combineReducers({
  movies: foodsReducer,
  filter: filterReducer,
  status: loaderReducer,
});

export default rootReducer;
