import { OPEN_MODAL, CLOSE_MODAL } from '../actions/index';

const modalReducer = (state = { }, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.response;
    case CLOSE_MODAL:
      return action.response;
    default:
      return state;
  }
};

export default modalReducer;
