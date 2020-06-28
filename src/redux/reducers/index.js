import { combineReducers } from 'redux';
import userReducer from './user';
import foodsReducer from './foods';
import selectedFoodReducer from './selectedFood';
import filterReducer from './filter';
import loaderReducer from './loader';
import modalReducer from './modal';

const rootReducer = combineReducers({
  user: userReducer,
  foods: foodsReducer,
  selectedFood: selectedFoodReducer,
  filter: filterReducer,
  modal: modalReducer,
  status: loaderReducer,
});

export default rootReducer;
