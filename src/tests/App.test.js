import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from '../App';

import rootReducer from '../redux/reducers/index';

const initialState = {
  user: { username: '', email: '', logged_in: false },
  foods: [
    {
      name: '', date: '', servings: 0, carbs: 0, fats: 0, proteins: 0,
    },
  ],
  selectedFood: {
    name: '', date: '', servings: 0, carbs: 0, fats: 0, proteins: 0, notes: [{ body: '' }],
  },
  modal: { isOpen: false, modalType: '' },
  status: { isLoading: false, errors: [] },
  filter: 'All',
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

// Tests related to all available react-router-dom links
test('renders login link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders registration link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/register/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders add new food link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/add new food/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders food list link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/food list/i);
  expect(linkElement).toBeInTheDocument();
});
