import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import '../../assets/css/food.css';

const Food = ({ meal }) => (
  <div>
    <Link to={{ pathname: `/foods/${meal.id}` }}>
      <div>{meal.name}</div>
      <div>{meal.servings_consumed}</div>
      <div>Total Calories: </div>
    </Link>
  </div>
);

Food.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    date_consumed: PropTypes.string,
    servings_consumed: PropTypes.number,
    carbs: PropTypes.number,
    fats: PropTypes.number,
    proteins: PropTypes.number,
    notes: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default Food;
