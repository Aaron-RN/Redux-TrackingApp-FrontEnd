import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Food from '../presentational/food';
import { fetchFoods, removeFood } from '../../redux/actions/index';

const FoodList = ({
  status, user, foods, fetchFoods, removeFood, redirectToLogin,
}) => {
  const [daysDisplayed, setdaysDisplayed] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const todaysDate = new Date();
  const useMountEffect = func => useEffect(func, []);
  const initialize = () => {
    const todaysDay = todaysDate.toLocaleDateString('en-US', { weekday: 'long' });
    setdaysDisplayed({ ...daysDisplayed, [todaysDay.toLowerCase()]: true });
    fetchFoods();
  };
  useMountEffect(initialize);

  const mealsContainer = React.useRef(null);

  const toggleDay = day => setdaysDisplayed({
    ...daysDisplayed,
    [day.toLowerCase()]: !daysDisplayed[day.toLowerCase()],
  });
  const showDay = day => daysDisplayed[day.toLowerCase()];
  const mealByDay = dayChosen => foods.map(meal => {
    let date = new Date(meal.date_consumed);
    date = new Date(date.getTime() - date.getTimezoneOffset() * -60000);
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
      let date = new Date(date_consumed);
      date = new Date(date.getTime() - date.getTimezoneOffset() * -60000);
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
      <div>
        <div>
          {todaysDate.toDateString()}
        </div>
        <div ref={mealsContainer} className="foods-section">
          <div>
            <button className="showDayBtn" type="button" onClick={() => toggleDay('Sunday')}><h2>Sunday</h2></button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Sunday')}
            </div>
            {showDay('Sunday') ? mealByDay('Saturday') : null}
          </div>
          <div>
            <button className="showDayBtn" type="button" onClick={() => toggleDay('Saturday')}><h2>Saturday</h2></button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Saturday')}
            </div>
            {showDay('Saturday') ? mealByDay('Saturday') : null}
          </div>
          <div>
            <button className="showDayBtn" type="button" onClick={() => toggleDay('Friday')}><h2>Friday</h2></button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Friday')}
            </div>
            {showDay('Friday') ? mealByDay('Friday') : null}
          </div>
          <div>
            <button className="showDayBtn" type="button" onClick={() => toggleDay('Thursday')}><h2>Thursday</h2></button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Thursday')}
            </div>
            {showDay('Thursday') ? mealByDay('Thursday') : null}
          </div>
          <div>
            <button className="showDayBtn" type="button" onClick={() => toggleDay('Wednesday')}><h2>Wednesday</h2></button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Wednesday')}
            </div>
            {showDay('Wednesday') ? mealByDay('Wednesday') : null}
          </div>
          <div>
            <button className="showDayBtn" type="button" onClick={() => toggleDay('Tuesday')}><h2>Tuesday</h2></button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Tuesday')}
            </div>
            {showDay('Tuesday') ? mealByDay('Tuesday') : null}
          </div>
          <div>
            <button className="showDayBtn" type="button" onClick={() => toggleDay('Monday')}><h2>Monday</h2></button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Monday')}
            </div>
            {showDay('Monday') ? mealByDay('Monday') : null}
          </div>
        </div>
      </div>
    );
  const { logged_in } = user;
  return logged_in ? renderMain : redirectToLogin();
};

FoodList.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  foods: PropTypes.instanceOf(Object).isRequired,
  fetchFoods: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
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
