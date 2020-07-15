import React from 'react';
import PropTypes from 'prop-types';

const ShowErrors = ({ errors }) => {
  const errorDiv = error => (
    <div key={error}>
      {error}
    </div>
  );

  return (
    <div className="errors">
      {errors.map(error => errorDiv(error))}
    </div>
  );
};

ShowErrors.propTypes = {
  errors: PropTypes.instanceOf(Array).isRequired,
};

export default ShowErrors;
