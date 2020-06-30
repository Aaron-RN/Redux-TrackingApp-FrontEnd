import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import RegistrationPage from './components/functional/registrationPage';
import LoginPage from './components/functional/loginPage';
import AddFoodPage from './components/functional/addFood';
import FoodListPage from './components/functional/foodList';
import MealDetailsPage from './components/functional/mealDetails';
import Modal from './components/functional/modal';
import { userLoggedIn, userLogout } from './redux/actions/index';
import './assets/css/App.css';

const App = ({
  modal, user, userLoggedIn, userLogout,
}) => {
  const redirectToLogin = () => (
    <Redirect push to={{ pathname: '/login' }} />
  );
  // const redirectToTrackIt = () => (
  //   <Redirect push to={{ pathname: '/foods' }} />
  // );

  useEffect(() => {
    userLoggedIn();
  }, [userLoggedIn]);

  if (!user.logged_in && window.location.pathname !== '/login') return redirectToLogin();
  // if (user.logged_in && window.location.pathname === '/login') return redirectToTrackIt();

  const activeLink = path => {
    if (window.location.pathname === path) {
      return 'activeLink';
    }
    return '';
  };
  const nav = (
    <nav>
      <div className="horizontal-list">
        <Link to={{ pathname: '/addFood' }}>
          <div>
            <i className="fas fa-utensils" />
            <span>Add Calories</span>
          </div>
        </Link>
        <Link to={{ pathname: '/foods' }}>
          <div>
            <i className="fas fa-chart-line" />
            <span>Track.it</span>
          </div>
        </Link>
        <Link to={{ pathname: '/register' }}>
          <div>
            <i className="fas fa-chart-pie" />
            <span>Progress</span>
          </div>
        </Link>
        <Link to={{ pathname: '/settings' }}>
          <i className="fas fa-ellipsis-h" />
          <span>More</span>
        </Link>
      </div>
    </nav>
  );

  const { isOpen } = modal;
  const showModal = isOpen
    ? (
      <Modal />
    ) : null;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div className="App">
      <header className="appHeader">
        <div className="font-header">Calorie Track.it</div>
        <div className="capitalize">
          <span>Hi </span>
          {user.username}
          <button className="bareBtn" type="button" onClick={() => userLogout()}>
            <i className="fas fa-sign-out-alt" />
          </button>
        </div>
      </header>
      <main className="height-main-hidden">
        <Switch>
          <Route exact path="/foods/:id" render={props => <MealDetailsPage match={props.match} redirectToLogin={redirectToLogin} />} />
          <Route exact path="/foods" render={props => <FoodListPage {...props} redirectToLogin={redirectToLogin} />} />
          <Route exact path="/addFood" render={props => <AddFoodPage {...props} redirectToLogin={redirectToLogin} />} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/" component={LoginPage} />
        </Switch>
        {showModal}
      </main>
      <footer>{nav}</footer>
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

App.defaultProps = {
  match: { },
};
App.propTypes = {
  match: PropTypes.instanceOf(Object),
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
