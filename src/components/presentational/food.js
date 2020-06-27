import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import '../../assets/css/food.css';

const Food = ({ foodsList, meal, removeFood }) => (
  <div>
    <Link to={{
      pathname: `/foods/${meal.id}`,
      route_state: {
        foodsList,
        removeFood,
      },
    }}
    >
      <div>{meal.name}</div>
      <div>{meal.servings_consumed}</div>
      <div>Total Calories: </div>
    </Link>
  </div>
);

Food.propTypes = {
  foodsList: PropTypes.instanceOf(Array).isRequired,
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
  removeFood: PropTypes.instanceOf(Object).isRequired,
};

export default Food;
