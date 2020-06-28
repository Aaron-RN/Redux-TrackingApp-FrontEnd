import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import registrationPage from './components/functional/registrationPage';
import loginPage from './components/functional/loginPage';
import addFoodPage from './components/functional/addFood';
import foodListPage from './components/functional/foodList';
import mealDetailsPage from './components/functional/mealDetails';
import Modal from './components/functional/modal';
import { userLoggedIn, userLogout } from './redux/actions/index';
import './assets/css/App.css';

const App = ({
  modal, user, userLoggedIn, userLogout,
}) => {
  useEffect(() => {
    userLoggedIn();
  }, [userLoggedIn]);

  const nav = (
    <nav>
      <div className="center container">
        <div className="font-header">ARN Calorie Tracker</div>
        <div>
          <span>Hi </span>
          {user.username}
          ,
        </div>
        <div>
          <div className="horizontal-list">
            <div>
              <Link to={{ pathname: '/register' }}>
                <span>Register </span>
              </Link>
            </div>
            <div>
              <Link to={{ pathname: '/login' }}>
                <span>Login </span>
              </Link>
            </div>
            <div>
              <Link to={{ pathname: '/addFood' }}>
                <span>Add New Food </span>
              </Link>
            </div>
            <div>
              <Link to={{ pathname: '/foods' }}>
                <span>Food List</span>
              </Link>
            </div>
            <button type="button" onClick={() => userLogout()}>Logout</button>
          </div>
        </div>
        <div className="logo" />
      </div>
    </nav>
  );

  const { isOpen } = modal;
  const showModal = isOpen
    ? (
      <Modal />
    ) : null;
  return (
    <Router>
      <div className="App">
        {nav}
        <main className="App-body">
          <Switch>
            <Route exact path="/foods/:id" component={mealDetailsPage} />
            <Route exact path="/foods" component={foodListPage} />
            <Route exact path="/addFood" component={addFoodPage} />
            <Route exact path="/login" component={loginPage} />
            <Route exact path="/register" component={registrationPage} />
            <Route exact path="/" component={loginPage} />
          </Switch>
          {showModal}
        </main>
      </div>
    </Router>
  );
};

App.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  modal: PropTypes.instanceOf(Object).isRequired,
  userLoggedIn: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => ({
  userLoggedIn: () => {
    dispatch(userLoggedIn());
  },
  userLogout: () => {
    dispatch(userLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
