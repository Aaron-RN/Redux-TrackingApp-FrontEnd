import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLogin } from '../../redux/actions/index';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginCreds: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectForm = React.createRef();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    const { userLogin } = this.props;
    const { loginCreds, password } = this.state;
    const user = { username: loginCreds.toLowerCase(), email: loginCreds.toLowerCase(), password };

    e.preventDefault();
    userLogin(user);
    this.reset();
  }

  reset() {
    this.selectForm.current.scrollIntoView({ behavior: 'smooth' });
    this.setState({
      loginCreds: '',
      password: '',
    });
  }

  render() {
    const {
      loginCreds, password,
    } = this.state;
    const { status } = this.props;
    const { isLoading, errors, form } = status;
    const errorDiv = error => (
      <div key={error}>
        {error}
      </div>
    );
    const showErrors = form === 'loginForm' ? (
      <div className="errors">
        {errors.map(error => errorDiv(error))}
      </div>
    ) : null;

    const renderMain = isLoading
      ? (
        <div className="text-center">
          <div className="loader center" />
          <h1 className="text-white">Loading...</h1>
        </div>
      )
      : (
        <div className="max-height-hidden">
          <div className="formTitle">
            <h3>Sign In</h3>
            {showErrors}
          </div>
          <div className="p-t p-b max-height-auto">
            <form ref={this.selectForm} onSubmit={this.handleSubmit} className="form">
              <div>
                <input
                  placeholder="Username or Email"
                  name="loginCreds"
                  type="text"
                  value={loginCreds}
                  minLength="3"
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  minLength="3"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit">Login</button>
              <Link to="/register">
                <span>Not signed up yet?</span>
              </Link>
            </form>
          </div>
        </div>
      );
    const { user } = this.props;
    /* eslint-disable camelcase */
    const { logged_in } = user;
    const { redirectTo } = this.props;
    return !logged_in ? renderMain : redirectTo('/foods');
    /* eslint-enable camelcase */
  }
}

LoginForm.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  userLogin: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  userLogin: user => {
    dispatch(userLogin(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
