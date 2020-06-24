import axios from 'axios';

const URL = 'https://arn-tracking-app-api.herokuapp.com/';

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
const FETCH_REQUEST_FAILURE = 'FETCH_REQUEST_FAILURE';
const USER_REGISTER = 'USER_REGISTER';
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const FETCH_FOODLIST = 'FETCH_FOODLIST';
const ADD_FOOD = 'ADD_FOOD';
const REMOVE_FOOD = 'REMOVE_FOOD';
const EDIT_FOOD = 'EDIT_FOOD';
const ADD_NOTE = 'ADD_NOTE';
const CHANGE_FILTER = 'CHANGE_FILTER';

const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

const fetchRequestSuccess = response => ({
  type: FETCH_REQUEST_SUCCESS,
  response,
});

const fetchRequestFailure = (response, form = '') => ({
  type: FETCH_REQUEST_FAILURE,
  response,
  form,
});

const userRegisterSuccess = user => ({
  type: USER_REGISTER,
  response: user,
});

const userLoginSuccess = user => ({
  type: USER_LOGIN,
  response: user,
});

const userLogout = user => ({
  type: USER_LOGOUT,
  response: user,
});

const fetchFoodListSuccess = foods => ({
  type: FETCH_FOODLIST,
  response: foods,
});
const changeFilter = genre => ({
  type: CHANGE_FILTER,
  genre,
});

// Register User
const registerNewUser = user => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}registrations/create`, {
    username: user.name,
    email: user.email,
    password: user.password,
    password_confirmation: user.password_confirmation,
  })
    .then(response => {
      const newUser = response.data.data;
      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(userRegisterSuccess(newUser));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error, 'registrationForm'));
    });
};

// User Login
const userLogin = user => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}sessions/create`, {
    username: user.name,
    email: user.email,
    password: user.password,
  })
    .then(response => {
      const userLoggedIn = response.data.data;
      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(userLogin(userLoggedIn));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error, 'loginForm'));
    });
};

// Grab all foods from API Database related to current logged in user
const fetchFoods = userID => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}${userID}`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.statusText));
      dispatch(fetchFoodListSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.status_message));
    });
};

export {
  CHANGE_FILTER, FETCH_FOODLIST, ADD_FOOD, EDIT_FOOD, REMOVE_FOOD, ADD_NOTE,
  USER_LOGIN, USER_LOGOUT, USER_REGISTER,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE,
  registerNewUser, userLogin, changeFilter, fetchFoods,
};
