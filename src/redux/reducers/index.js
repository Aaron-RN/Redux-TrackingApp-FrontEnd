import { combineReducers } from 'redux';
import userReducer from './user';
import foodsReducer from './foods';
import selectedFoodReducer from './selectedFood';
import filterReducer from './filter';
import loaderReducer from './loader';

const rootReducer = combineReducers({
  user: userReducer,
  foods: foodsReducer,
  foodSelected: selectedFoodReducer,
  filter: filterReducer,
  status: loaderReducer,
});

export default rootReducer;
