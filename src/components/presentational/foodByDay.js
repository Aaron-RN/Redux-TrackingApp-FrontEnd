import React from 'react';
import PropTypes from 'prop-types';

const FoodByDay = ({
  day, toggleDay, caloriesByDay, showDay, mealByDay,
}) => (
  <div>
    <div>
      <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay(day, e)}>
        <h2>{day}</h2>
        <i className="plus far fa-plus-square" />
        <i className="minus far fa-minus-square" />
      </button>
      <div className="calories">
        <span>Total Calories: </span>
        <span>{caloriesByDay(day)}</span>
      </div>
    </div>
    {showDay(day) ? mealByDay(day) : null}
  </div>
);

FoodByDay.propTypes = {
  day: PropTypes.string.isRequired,
  toggleDay: PropTypes.func.isRequired,
  caloriesByDay: PropTypes.func.isRequired,
  showDay: PropTypes.func.isRequired,
  mealByDay: PropTypes.func.isRequired,
};

export default FoodByDay;
