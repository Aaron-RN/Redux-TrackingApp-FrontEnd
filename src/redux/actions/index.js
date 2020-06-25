import axios from 'axios';

const URL = 'https://arn-tracking-app-api.herokuapp.com/';

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
const FETCH_REQUEST_FAILURE = 'FETCH_REQUEST_FAILURE';
const USER_REGISTER = 'USER_REGISTER';
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const FETCH_FOODLIST = 'FETCH_FOODLIST';
const FETCH_FOOD = 'FETCH_FOOD';
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
  response: { ...user, logged_in: false },
});

const fetchFoodListSuccess = foods => ({
  type: FETCH_FOODLIST,
  response: foods,
});
const fetchFoodSuccess = food => ({
  type: FETCH_FOOD,
  response: food,
});
const createFood = food => ({
  type: ADD_FOOD,
  food,
});

const changeFilter = genre => ({
  type: CHANGE_FILTER,
  genre,
});

// Register User
const registerNewUser = user => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}registrations`, { user }, { withCredentials: true })
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
  axios.post(`${URL}sessions`, { user }, { withCredentials: true })
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
      const clearUser = { username: '', email: '', password_digest: '' };

      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(userLogoutSuccess(clearUser, response.data.logged_out));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.status, 'logoutForm'));
    });
};

// Grab all foods from API Database related to current logged in user
const fetchFoods = () => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}foods`)
    .then(response => {
      dispatch(fetchRequestSuccess('Showing all foods for current User...'));
      dispatch(fetchFoodListSuccess(response.data.food));
    })
    .catch(error => {
      console.log(error);
      dispatch(fetchRequestFailure(error));
    });
};
// Grab one food from API Database
const fetchFood = foodID => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}foods/${foodID}`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchFoodSuccess(response.data.selected_food));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};
// Food requests
const addFood = food => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}foods`, { food })
    .then(response => {
      const newFood = response.data.selected_food;
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(createFood(newFood));
    })
    .catch(error => {
      console.log(error.response);
      dispatch(fetchRequestFailure(error.response.data.error, 'foodForm'));
    });
};

export {
  CHANGE_FILTER, FETCH_FOODLIST, FETCH_FOOD, ADD_FOOD, EDIT_FOOD, REMOVE_FOOD, ADD_NOTE,
  USER_LOGIN, USER_LOGOUT, USER_REGISTER,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE,
  registerNewUser, userLogin, userLoggedIn, userLogout, changeFilter,
  fetchFoods, fetchFood, addFood,
};
