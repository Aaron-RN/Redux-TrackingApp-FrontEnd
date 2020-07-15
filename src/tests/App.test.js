import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
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

// Tests related to all available react-router-dom links
test('renders add calories link', () => {
  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  );
  const linkElement = screen.getByText(/add calories/i);
  expect(linkElement).toBeInTheDocument();
});

// test('renders track.it link', () => {
//   render(
//     <Router>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </Router>,
//   );
//   const linkElement = screen.getByText(/track/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders progress link', () => {
  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  );
  const linkElement = screen.getByText(/progress/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders more link', () => {
  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  );
  const linkElement = screen.getByText(/more/i);
  expect(linkElement).toBeInTheDocument();
});
