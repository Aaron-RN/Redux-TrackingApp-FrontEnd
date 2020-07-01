import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../assets/css/food.css';

const Food = ({ meal }) => {
  const {
    /* eslint-disable camelcase */
    name, servings_consumed, carbs, fats, proteins,
  } = meal;
  const carbCalories = carbs * 4;
  const fatCalories = fats * 9;
  const proteinCalories = proteins * 4;
  const totalCalories = (carbCalories + fatCalories + proteinCalories) * servings_consumed;

  return (
    <div className="foodItem">
      <Link to={{ pathname: `/foods/${meal.id}` }} className="foodLink">
        <h4>{name}</h4>
        <div className="servings">
          <span>Servings: </span>
          <span>{servings_consumed}</span>
        </div>
        <div className="calories">
          <span>Calories: </span>
          <span>{totalCalories}</span>
        </div>
      </Link>
    </div>
  );
};
/* eslint-enable camelcase */

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
