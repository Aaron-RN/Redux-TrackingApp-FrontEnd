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

const userRegisterSuccess = (user, loggedIn) => ({
  type: USER_REGISTER,
  response: { ...user, logged_in: loggedIn },
});

const userLoginSuccess = (user, loggedIn) => ({
  type: USER_LOGIN,
  response: { ...user, logged_in: loggedIn },
});

const userLogoutSuccess = user => ({
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
  axios.post(`${URL}registrations`, { user })
    .then(response => {
      const newUser = response.data.user;

      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(userRegisterSuccess(newUser, true));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error, 'registrationForm'));
    });
};

// User Login
const userLogin = user => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}sessions`, { user })
    .then(response => {
      const retrievedUser = response.data.user;
      const userLoggedIn = response.data.logged_in;

      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(userLoginSuccess(retrievedUser, userLoggedIn));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error, 'loginForm'));
    });
};

// Is User Still Logged In?
const userLoggedIn = () => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}logged_in`, { withCredentials: true })
    .then(response => {
      const retrievedUser = response.data.user || {};
      const userLoggedIn = response.data.logged_in;

      dispatch(fetchRequestSuccess('User still Logged in'));
      dispatch(userLoginSuccess(retrievedUser, userLoggedIn));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.status, 'logoutForm'));
    });
};

// User Logout
const userLogout = () => dispatch => {
  dispatch(fetchRequest());
  axios.delete(`${URL}logout`, { withCredentials: true })
    .then(response => {
      const userLogged = { name: '', email: '', logged_in: false };

      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(userLogoutSuccess(userLogged));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.status, 'logoutForm'));
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
  registerNewUser, userLogin, userLoggedIn, userLogout, changeFilter, fetchFoods,
};
