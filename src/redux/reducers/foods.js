import { FETCH_FOODLIST, ADD_FOOD } from '../actions/index';

const foodsReducer = (state = { }, action) => {
  switch (action.type) {
    case FETCH_FOODLIST:
      return [...action.response];
    case ADD_FOOD:
      return [...action.response];
    default:
      return state;
  }
};

export default foodsReducer;
