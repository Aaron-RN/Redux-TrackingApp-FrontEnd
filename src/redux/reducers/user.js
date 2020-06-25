import { USER_REGISTER, USER_LOGOUT, USER_LOGIN } from '../actions/index';

const userReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return action.response;
    case USER_LOGIN:
      console.log(action.response);
      return action.response;
    case USER_LOGOUT:
      return action.response;
    default:
      return state;
  }
};

export default userReducer;
