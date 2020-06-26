import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import registrationPage from './components/functional/registrationPage';
import loginPage from './components/functional/loginPage';
import addFoodPage from './components/functional/addFood';
import { userLoggedIn, userLogout } from './redux/actions/index';
import './assets/css/App.css';

const App = ({
  status, user, userLoggedIn, userLogout,
}) => {
  useEffect(() => {
    userLoggedIn();
  }, [userLoggedIn]);

  useEffect(() => {
    if (user.logged_in === false) {
      return (
        <Redirect
          push
          to={{
            pathname: '/login',
          }}
        />
      );
    }
  }, [user.logged_in]);

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
                <i className="fas fa-film" />
              </Link>
            </div>
            <div>
              <Link to={{
                pathname: '/login',
              }}
              >
                <span>Login </span>
                <i className="fas fa-film" />
              </Link>
            </div>
            <div>
              <Link to={{
                pathname: '/addFood',
              }}
              >
                <span>Add New Food </span>
                <i className="fas fa-film" />
              </Link>
            </div>
            <button type="button" onClick={() => userLogout()}>Logout</button>
          </div>
        </div>
        <div className="logo" />
      </div>
    </nav>
  );
  const { isLoading } = status;
  const renderMain = isLoading
    ? (
      <div className="text-center">
        <div className="loader center" />
        <h1 className="text-white">Loading...</h1>
      </div>
    )
    : (
      <Switch>
        <Route exact path="/addFood" component={addFoodPage} />
        <Route exact path="/login" component={loginPage} />
        <Route exact path="/register" component={registrationPage} />
        <Route exact path="/" component={loginPage} />
      </Switch>
    );
  return (
    <Router>
      <div className="App">
        {nav}
        <main className="App-body">
          {renderMain}
        </main>
      </div>
    </Router>
  );
};

App.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  userLoggedIn: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  status: state.status,
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
