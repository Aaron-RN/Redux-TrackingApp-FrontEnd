import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../../redux/actions/index';
// import '../assets/css/registrationForm.css';

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
    const user = { username: loginCreds, email: loginCreds, password };

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
    const { errors, form } = status;
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

    return (
      <div className="bg-header round-bottom box-shadow">
        <div className="center max-width-90 border-top">
          <div className="formTitle">Sign In</div>
          {showErrors}
          <form ref={this.selectForm} onSubmit={this.handleSubmit} className="loginForm">
            <div>
              <input
                placeholder="Username or Email"
                name="loginCreds"
                type="text"
                value={loginCreds}
                onChange={this.handleChange}
              />
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  userLogin: user => {
    dispatch(userLogin(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
