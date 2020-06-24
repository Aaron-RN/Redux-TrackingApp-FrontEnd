import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './assets/css/index.css';
import App from './App';

import rootReducer from './redux/reducers/index';

const initialState = {
  user: { username: '', email: '', logged_in: false },
  foods: [
    {
      name: '', date: '', servings: 0, carbs: 0, fats: 0, proteins: 0, notes: [{ body: '' }],
    },
  ],
  status: { isLoading: false, errors: [] },
  filter: 'All',
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
