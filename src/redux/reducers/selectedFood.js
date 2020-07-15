import { FETCH_FOOD } from '../actions/index';

const selectedFoodReducer = (state = { }, action) => {
  switch (action.type) {
    case FETCH_FOOD:
      return action.response;
    default:
      return state;
  }
};

export default selectedFoodReducer;
