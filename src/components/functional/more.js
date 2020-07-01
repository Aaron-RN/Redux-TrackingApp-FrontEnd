import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/css/more.css';

const More = ({ user, userLogout, redirectToLogin }) => {
  const renderMain = (
    <div id="More">
      <header className="profileHeader">
        <div className="userProfile">
          <i className="fas fa-user" />
          <div className="userInfo">
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
        </div>
      </header>
      <div className="settingsList">
        <button type="button" disabled>
          <i className="fas fa-user-circle" />
          <span> Your Profile</span>
        </button>
        <button type="button" onClick={userLogout}>
          <i className="fas fa-sign-out-alt" />
          <span> Logout</span>
        </button>
        <button type="button" disabled>
          <i className="fas fa-cogs" />
          <span> Settings</span>
        </button>
        <button type="button" disabled>
          <i className="fas fa-info-circle" />
          <span> Help</span>
        </button>
      </div>
    </div>
  );
  /* eslint-disable camelcase */
  const { logged_in } = user;
  return logged_in ? renderMain : redirectToLogin();
  /* eslint-enable camelcase */
};
More.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  userLogout: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(More);
