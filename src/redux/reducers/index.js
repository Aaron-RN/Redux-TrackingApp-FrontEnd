import { combineReducers } from 'redux';
import userReducer from './user';
import foodsReducer from './foods';
import selectedFoodReducer from './selectedFood';
import loaderReducer from './loader';
import modalReducer from './modal';

const rootReducer = combineReducers({
  user: userReducer,
  foods: foodsReducer,
  selectedFood: selectedFoodReducer,
  modal: modalReducer,
  status: loaderReducer,
});

export default rootReducer;
