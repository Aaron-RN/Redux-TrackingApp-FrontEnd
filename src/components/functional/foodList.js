import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../presentational/loading';
import Food from '../presentational/food';
import FoodByDay from '../presentational/foodByDay';
import { fetchFoods, removeFood } from '../../redux/actions/index';
import getSelectedWeek from '../misc/getSelectedWeek';
import calculateCalories from '../misc/calorieCalculator';
import '../../assets/css/foodList.css';

const FoodList = ({
  status, user, foods, fetchFoods, redirectTo,
}) => {
  const [weekSelected, setWeekSelected] = useState({
    text: '',
    startDate: '',
    endDate: '',
    allDates: [],
    allMonths: [],
    allYears: [],
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

  const useMountEffect = func => useEffect(func, []);
  const initialize = () => {
    const currentWeek = getSelectedWeek();
    setWeekSelected({ ...currentWeek });
    const todaysDate = new Date();
    const todaysDay = todaysDate.toLocaleDateString('en-US', { weekday: 'long' });
    setdaysDisplayed({ ...daysDisplayed, [todaysDay.toLowerCase()]: true });
    fetchFoods();
  };
  useMountEffect(initialize);

  const mealsContainer = React.useRef(null);

  const previousWeek = () => {
    const currentWeek = getSelectedWeek(-1, weekSelected);
    setWeekSelected({ ...currentWeek });
  };
  const nextWeek = () => {
    const currentWeek = getSelectedWeek(1, weekSelected);
    setWeekSelected({ ...currentWeek });
  };
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
    if (!weekSelected.allDates.find(elem => elem === date.getDate())) return null;
    if (!weekSelected.allMonths.find(elem => elem === date.getMonth())) return null;
    if (!weekSelected.allYears.find(elem => elem === date.getFullYear())) return null;

    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (day !== dayChosen) return null;
    return (
      <Food key={meal.id + meal.name} meal={meal} />
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
      if (!weekSelected.allDates.find(elem => elem === date.getDate())) return;
      if (!weekSelected.allMonths.find(elem => elem === date.getMonth())) return;
      if (!weekSelected.allYears.find(elem => elem === date.getFullYear())) return;

      const day = date.toLocaleDateString('en-US', { weekday: 'long' });

      const totalCalories = calculateCalories(servings_consumed, carbs, fats, proteins);

      if (day === dayChosen) {
        CaloriesForMeals += totalCalories;
      }
    });
    return CaloriesForMeals;
  };
  const { isLoading } = status;
  const renderMain = isLoading
    ? (
      <Loading />
    )
    : (
      <div className="max-height-hidden">
        <header className="foodHeader">
          <button className="dateBtn" type="button" onClick={previousWeek}>
            <i className="fas fa-chevron-circle-left" />
          </button>
          <h4>{weekSelected.text}</h4>
          <button className="dateBtn" type="button" onClick={nextWeek}>
            <i className="fas fa-chevron-circle-right" />
          </button>
        </header>
        <div ref={mealsContainer} className="foodSection p-t p-b max-height-auto">
          <FoodByDay day="Sunday" toggleDay={toggleDay} caloriesByDay={caloriesByDay} showDay={showDay} mealByDay={mealByDay} />
          <FoodByDay day="Saturday" toggleDay={toggleDay} caloriesByDay={caloriesByDay} showDay={showDay} mealByDay={mealByDay} />
          <FoodByDay day="Friday" toggleDay={toggleDay} caloriesByDay={caloriesByDay} showDay={showDay} mealByDay={mealByDay} />
          <FoodByDay day="Thursday" toggleDay={toggleDay} caloriesByDay={caloriesByDay} showDay={showDay} mealByDay={mealByDay} />
          <FoodByDay day="Wednesday" toggleDay={toggleDay} caloriesByDay={caloriesByDay} showDay={showDay} mealByDay={mealByDay} />
          <FoodByDay day="Tuesday" toggleDay={toggleDay} caloriesByDay={caloriesByDay} showDay={showDay} mealByDay={mealByDay} />
          <FoodByDay day="Monday" toggleDay={toggleDay} caloriesByDay={caloriesByDay} showDay={showDay} mealByDay={mealByDay} />
        </div>
      </div>
    );
  const { logged_in } = user;
  return logged_in ? renderMain : redirectTo('/login');
};

FoodList.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  foods: PropTypes.instanceOf(Object).isRequired,
  fetchFoods: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
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
