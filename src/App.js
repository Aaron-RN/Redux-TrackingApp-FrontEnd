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
import { userLoggedIn } from './redux/actions/index';
import './assets/css/App.css';

const App = ({ status, user, userLoggedIn }) => {
  useEffect(() => {
    userLoggedIn();
  }, []);

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
              <Link to={{
                pathname: '/register',
                route_state: {
                  resetPage: true,
                },
              }}
              >
                <span>Register </span>
                <i className="fas fa-film" />
              </Link>
            </div>
            <div>
              <Link to={{
                pathname: '/login',
                route_state: {
                  resetPage: true,
                },
              }}
              >
                <span>Login </span>
                <i className="fas fa-film" />
              </Link>
            </div>
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
        <Route exact path="/login" component={loginPage} />
        <Route exact path="/register" component={registrationPage} />
        <Route exact path="/" component={registrationPage} />
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
};

const mapStateToProps = state => ({
  user: state.user,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  userLoggedIn: () => {
    dispatch(userLoggedIn());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
