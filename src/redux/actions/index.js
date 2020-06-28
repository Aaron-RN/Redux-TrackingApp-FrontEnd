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
const SET_MODAL = 'SET_MODAL';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
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

const changeFilter = genre => ({
  type: CHANGE_FILTER,
  response: genre,
});

const openModal = modalType => ({
  type: OPEN_MODAL,
  response: { isOpen: true, modalType },
});
const closeModal = () => ({
  type: CLOSE_MODAL,
  response: { isOpen: false, modalType: '' },
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
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'registrationForm'));
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
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'loginForm'));
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
      const userLoggedIn = error.response.data.logged_in;
      dispatch(userLoginSuccess({}, userLoggedIn));
      const errorMsg = error.response.data.status || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'logoutForm'));
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
      const errorMsg = error.response.data.status || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'logoutForm'));
    });
};

// Grab all foods from API Database related to current logged in user
const fetchFoods = () => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}foods`, { withCredentials: true })
    .then(response => {
      dispatch(fetchRequestSuccess('Showing all foods for current User...'));
      dispatch(fetchFoodListSuccess(response.data.food));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg));
    });
};
// Grab one food from API Database
const fetchFood = foodID => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}foods/${foodID}`, { withCredentials: true })
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchFoodSuccess(response.data.selected_food));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg));
    });
};
// Food requests
const addFood = food => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}foods`, { food }, { withCredentials: true })
    .then(response => {
      const newFoodList = response.data.food;
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchFoodListSuccess(newFoodList));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'foodForm'));
    });
};
const removeFood = food => dispatch => {
  dispatch(fetchRequest());
  axios.delete(`${URL}foods/${food.id}`, { withCredentials: true })
    .then(response => {
      const newFoodList = response.data.food;
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchFoodListSuccess(newFoodList));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg));
    });
};
// Note requests
const addNote = (foodID, note) => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}foods/${foodID}/notes`, { note }, { withCredentials: true })
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchFoodSuccess(response.data.selected_food));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg, 'noteForm'));
    });
};
const removeNote = (foodID, noteID) => dispatch => {
  dispatch(fetchRequest());
  axios.delete(`${URL}foods/${foodID}/notes/${noteID}`, { withCredentials: true })
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.status));
      dispatch(fetchFoodSuccess(response.data.selected_food));
    })
    .catch(error => {
      const errorMsg = error.response.data.error || [`${error.response.statusText}`];
      dispatch(fetchRequestFailure(errorMsg));
    });
};

export {
  CHANGE_FILTER, FETCH_FOODLIST, FETCH_FOOD,
  USER_LOGIN, USER_LOGOUT, USER_REGISTER,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE,
  SET_MODAL, OPEN_MODAL, CLOSE_MODAL,
  registerNewUser, userLogin, userLoggedIn, userLogout, changeFilter,
  fetchFoods, fetchFood, addFood, removeFood, addNote, removeNote,
  openModal, closeModal,
};
