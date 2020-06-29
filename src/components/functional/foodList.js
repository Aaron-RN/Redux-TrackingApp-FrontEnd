import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Food from '../presentational/food';
import { fetchFoods, removeFood } from '../../redux/actions/index';

const FoodList = ({
  status, foods, fetchFoods, removeFood,
}) => {
  const useMountEffect = func => useEffect(func, []);

  useMountEffect(fetchFoods);

  const mealsContainer = React.useRef(null);

  const mealByDay = dayChosen => foods.map(meal => {
    const date = new Date(meal.date_consumed);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (day !== dayChosen) return null;
    return (
      <Food key={meal.id + meal.name} foodsList={foods} meal={meal} removeFood={removeFood} />
    );
  });
  const caloriesByDay = dayChosen => {
    let CaloriesForMeals = 0;
    foods.forEach(meal => {
      const {
        /* eslint-disable camelcase */
        date_consumed, servings_consumed, carbs, fats, proteins,
      } = meal;
      const date = new Date(date_consumed);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });

      const carbCalories = carbs * 4;
      const fatCalories = fats * 9;
      const proteinCalories = proteins * 4;
      const totalCalories = (carbCalories + fatCalories + proteinCalories) * servings_consumed;

      if (day === dayChosen) {
        CaloriesForMeals += totalCalories;
      }
    });
    return CaloriesForMeals;
  };
  const { isLoading } = status;
  const renderMain = isLoading
    ? (
      <div className="text-center">
        <div className="loader center" />
        <h1 className="text-white">Loading...</h1>
      </div>
    )
    : (
      <div ref={mealsContainer} className="foods-section">
        <div>
          <h2>Sunday</h2>
          <div>
            <span>Total Calories: </span>
            {caloriesByDay('Sunday')}
          </div>
          {mealByDay('Sunday')}
        </div>
        <div>
          <h2>Saturday</h2>
          <div>
            <span>Total Calories: </span>
            {caloriesByDay('Saturday')}
          </div>
          {mealByDay('Saturday')}
        </div>
        <div>
          <h2>Friday</h2>
          <div>
            <span>Total Calories: </span>
            {caloriesByDay('Friday')}
          </div>
          {mealByDay('Friday')}
        </div>
        <div>
          <h2>Thursday</h2>
          <div>
            <span>Total Calories: </span>
            {caloriesByDay('Thursday')}
          </div>
          {mealByDay('Thursday')}
        </div>
        <div>
          <h2>Wednesday</h2>
          <div>
            <span>Total Calories: </span>
            {caloriesByDay('Wednesday')}
          </div>
          {mealByDay('Wednesday')}
        </div>
        <div>
          <h2>Tuesday</h2>
          <div>
            <span>Total Calories: </span>
            {caloriesByDay('Tuesday')}
          </div>
          {mealByDay('Tuesday')}
        </div>
        <div>
          <h2>Monday</h2>
          <div>
            <span>Total Calories: </span>
            {caloriesByDay('Monday')}
          </div>
          {mealByDay('Monday')}
        </div>
      </div>
    );
  return renderMain;
};

FoodList.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  foods: PropTypes.instanceOf(Object).isRequired,
  fetchFoods: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
  foods: state.foods,
});

const mapDispatchToProps = dispatch => ({
  fetchFoods: () => {
    dispatch(fetchFoods());
  },
  removeFood: food => {
    dispatch(removeFood(food));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodList);
