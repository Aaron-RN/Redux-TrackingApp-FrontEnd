import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerNewUser } from '../../redux/actions/index';
// import '../assets/css/registrationForm.css';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
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
    const { registerNewUser } = this.props;

    e.preventDefault();
    registerNewUser(this.state);
    this.reset();
  }

  reset() {
    this.selectForm.current.scrollIntoView({ behavior: 'smooth' });
    this.setState({
      username: '',
      email: '',
      password: '',
      password_confirm: '',
    });
  }

  render() {
    const {
      // eslint-disable-next-line camelcase
      username, email, password, password_confirm,
    } = this.state;
    const { status } = this.props;
    const { isLoading, errors, form } = status;
    const errorDiv = error => (
      <div key={error}>
        {error}
      </div>
    );
    const showErrors = form === 'registrationForm' ? (
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
        <div className="bg-header round-bottom box-shadow">
          <div className="center max-width-90 border-top">
            <div className="formTitle">New User?</div>
            {showErrors}
            <form ref={this.selectForm} onSubmit={this.handleSubmit} className="registrationForm">
              <div>
                <input
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Password Confirmation"
                  name="password_confirm"
                  type="password"
                  // eslint-disable-next-line camelcase
                  value={password_confirm}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      );
    return renderMain;
  }
}

RegistrationForm.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  registerNewUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  registerNewUser: user => {
    dispatch(registerNewUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
