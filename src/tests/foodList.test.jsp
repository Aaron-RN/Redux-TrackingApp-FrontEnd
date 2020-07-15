import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

// Show login Page
test('shows elements of food list page', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  // the queries can accept a regex to make your selectors more resilient to content changes.
  fireEvent.click(screen.getByText(/login/i));

  // wait for page to load
  const userName = new RegExp('', 'i');

  const foodCalories = await screen.findByText(userName);
  expect(foodCalories).toHaveTextContent(regTitle);

  // show all day buttons
  expect(screen.getByText(/monday/i)).toBeInTheDocument();
  expect(screen.getByText(/tuesday/i)).toBeInTheDocument();
  expect(screen.getByText(/wednesday/i)).toBeInTheDocument();
  expect(screen.getByText(/thursday/i)).toBeInTheDocument();
  expect(screen.getByText(/friday/i)).toBeInTheDocument();
  expect(screen.getByText(/saturday/i)).toBeInTheDocument();
  expect(screen.getByText(/sunday/i)).toBeInTheDocument();
});

// Show FoodList Page with all meals recorded
test('shows elements of food list page', async () => {
  const textTitle = 'Total Calories:';
  const regTitle = new RegExp(textTitle, 'i');
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  // query* functions will return the element or null if it cannot be found
  // get* functions will return the element or throw an error if it cannot be found
  expect(screen.queryByText(textTitle)).toBeNull();

  // the queries can accept a regex to make your selectors more resilient to content changes.
  fireEvent.click(screen.getByText(/food list/i));

  // wait for page to load
  const foodCalories = await screen.findByText(regTitle);
  expect(foodCalories).toHaveTextContent(regTitle);

  // show all day buttons
  expect(screen.getByText(/monday/i)).toBeInTheDocument();
  expect(screen.getByText(/tuesday/i)).toBeInTheDocument();
  expect(screen.getByText(/wednesday/i)).toBeInTheDocument();
  expect(screen.getByText(/thursday/i)).toBeInTheDocument();
  expect(screen.getByText(/friday/i)).toBeInTheDocument();
  expect(screen.getByText(/saturday/i)).toBeInTheDocument();
  expect(screen.getByText(/sunday/i)).toBeInTheDocument();
});
