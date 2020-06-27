import React from 'react';
import PropTypes from 'prop-types';
// import '../../assets/css/food.css';

const Food = ({ meal, removeFood }) => (
  <div>
    <div>{meal.name}</div>
    <div>{meal.date_consumed}</div>
    <div>{meal.servings_consumed}</div>
    <div>{meal.carbs}</div>
    <div>{meal.fats}</div>
    <div>{meal.proteins}</div>
    <div>Total Calories: </div>
    <button type="button" onClick={() => removeFood(meal)}>Remove Food</button>
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
  removeFood: PropTypes.func.isRequired,
};

export default Food;
