import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Food from '../presentational/food';
import { fetchFoods, removeFood } from '../../redux/actions/index';
import '../../assets/css/foodList.css';

const FoodList = ({
  status, user, foods, fetchFoods, removeFood, redirectToLogin,
}) => {
  const [weekSelected, setWeekSelected] = useState({
    text: '',
    startDate: '',
    endDate: '',
  });
  const [daysDisplayed, setdaysDisplayed] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  let weekDated = '';
  const useMountEffect = func => useEffect(func, []);
  const initialize = () => {
    const todaysDate = new Date();
    const weekStart = new Date();
    const weekEnd = new Date();
    weekStart.setDate(todaysDate.getDate() - todaysDate.getDay());
    weekEnd.setDate(weekStart.getDate() + 6);
    weekDated = `${weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    setWeekSelected({ text: weekDated, startDate: weekStart, endDate: weekEnd });
    console.log(weekDated);
    const todaysDay = todaysDate.toLocaleDateString('en-US', { weekday: 'long' });
    setdaysDisplayed({ ...daysDisplayed, [todaysDay.toLowerCase()]: true });
    fetchFoods();
  };
  useMountEffect(initialize);

  const mealsContainer = React.useRef(null);

  const toggleDay = (day, e) => {
    setdaysDisplayed({
      ...daysDisplayed,
      [day.toLowerCase()]: !daysDisplayed[day.toLowerCase()],
    });
    if (daysDisplayed[day.toLowerCase()]) {
      e.currentTarget.setAttribute('data-dayDisplayed', '+');
    } else {
      e.currentTarget.setAttribute('data-dayDisplayed', '-');
    }
  };
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
      <div className="max-height-hidden">
        <header className="foodHeader">
          <h4>{weekSelected.text}</h4>
        </header>
        <div ref={mealsContainer} className="foodSection p-t p-b max-height-auto">
          <div>
            <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Sunday', e)}>
              <h2>Sunday</h2>
              <i className="plus far fa-plus-square" />
              <i className="minus far fa-minus-square" />
            </button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Sunday')}
            </div>
            {showDay('Sunday') ? mealByDay('Sunday') : null}
          </div>
          <div>
            <div>
              <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Saturday', e)}>
                <h2>Saturday</h2>
                <i className="plus far fa-plus-square" />
                <i className="minus far fa-minus-square" />
              </button>
              <div>Total Calories: </div>
              {caloriesByDay('Saturday')}
            </div>
            {showDay('Saturday') ? mealByDay('Saturday') : null}
          </div>
          <div>
            <div>
              <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Friday', e)}>
                <h2>Friday</h2>
                <i className="plus far fa-plus-square" />
                <i className="minus far fa-minus-square" />
              </button>
              <div className="calories">
                <span>Total Calories: </span>
                <span>{caloriesByDay('Friday')}</span>
              </div>
            </div>
            {showDay('Friday') ? mealByDay('Friday') : null}
          </div>
          <div>
            <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Thursday', e)}>
              <h2>Thursday</h2>
              <i className="plus far fa-plus-square" />
              <i className="minus far fa-minus-square" />
            </button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Thursday')}
            </div>
            {showDay('Thursday') ? mealByDay('Thursday') : null}
          </div>
          <div>
            <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Wednesday', e)}>
              <h2>Wednesday</h2>
              <i className="plus far fa-plus-square" />
              <i className="minus far fa-minus-square" />
            </button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Wednesday')}
            </div>
            {showDay('Wednesday') ? mealByDay('Wednesday') : null}
          </div>
          <div>
            <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Tuesday', e)}>
              <h2>Tuesday</h2>
              <i className="plus far fa-plus-square" />
              <i className="minus far fa-minus-square" />
            </button>
            <div>
              <span>Total Calories: </span>
              {caloriesByDay('Tuesday')}
            </div>
            {showDay('Tuesday') ? mealByDay('Tuesday') : null}
          </div>
          <div>
            <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Monday', e)}>
              <h2>Monday</h2>
              <i className="plus far fa-plus-square" />
              <i className="minus far fa-minus-square" />
            </button>
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
