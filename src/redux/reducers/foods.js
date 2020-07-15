import { FETCH_FOODLIST } from '../actions/index';

const foodsReducer = (state = { }, action) => {
  switch (action.type) {
    case FETCH_FOODLIST:
      return [...action.response];
    default:
      return state;
  }
};

export default foodsReducer;
