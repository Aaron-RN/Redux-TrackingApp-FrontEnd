import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import NavBar from './components/presentational/navbar';
import RegistrationPage from './components/functional/registrationPage';
import LoginPage from './components/functional/loginPage';
import AddFoodPage from './components/functional/addFood';
import FoodListPage from './components/functional/foodList';
import MealDetailsPage from './components/functional/mealDetails';
import ProgressPage from './components/functional/progress';
import MorePage from './components/functional/more';
import Modal from './components/functional/modal';
import { userLoggedIn, userLogout } from './redux/actions/index';
import './assets/css/App.css';

const App = ({
  modal, user, userLoggedIn, userLogout,
}) => {
  const redirectTo = path => (
    <Redirect push to={{ pathname: path }} />
  );

  useEffect(() => {
    userLoggedIn();
  }, [userLoggedIn]);

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
          <button title="logout" className="bareBtn" type="button" onClick={userLogout}>
            <i className="fas fa-sign-out-alt" />
          </button>
        </div>
      </header>
      <main className="height-main-hidden">
        <Switch>
          <Route exact path="/foods/:id" render={props => <MealDetailsPage match={props.match} redirectTo={redirectTo} />} />
          <Route exact path="/foods" render={props => <FoodListPage {...props} redirectTo={redirectTo} />} />
          <Route exact path="/addFood" render={props => <AddFoodPage {...props} redirectTo={redirectTo} />} />
          <Route exact path="/login" render={() => <LoginPage redirectTo={redirectTo} />} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/progress" render={() => <ProgressPage redirectTo={redirectTo} />} />
          <Route exact path="/more" render={() => <MorePage userLogout={userLogout} redirectTo={redirectTo} />} />
          <Route exact path="/" render={() => <LoginPage redirectTo={redirectTo} />} />
        </Switch>
        {showModal}
      </main>
      <footer><NavBar /></footer>
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
