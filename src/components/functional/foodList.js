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
    allDates: [],
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
    weekStart.setFullYear(todaysDate.getFullYear());
    weekStart.setMonth(todaysDate.getMonth());
    weekStart.setDate(todaysDate.getDate() - todaysDate.getDay());
    weekEnd.setFullYear(weekStart.getFullYear());
    weekEnd.setMonth(weekStart.getMonth());
    weekEnd.setDate(weekStart.getDate() + 6);
    weekDated = `${weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    const dates = [];
    const o = weekEnd.getDate();
    for (let i = weekStart.getDate(); i !== o + 1; i += 1) {
      if (i > 31) i = 1;
      dates.push(i);
    }
    setWeekSelected({
      text: weekDated, startDate: weekStart, endDate: weekEnd, allDates: dates,
    });
    const todaysDay = todaysDate.toLocaleDateString('en-US', { weekday: 'long' });
    setdaysDisplayed({ ...daysDisplayed, [todaysDay.toLowerCase()]: true });
    fetchFoods();
  };
  useMountEffect(initialize);

  const mealsContainer = React.useRef(null);

  const previousWeek = () => {
    const startingDay = new Date();
    const endingDay = new Date();
    startingDay.setFullYear(weekSelected.startDate.getFullYear());
    startingDay.setMonth(weekSelected.startDate.getMonth());
    startingDay.setDate(weekSelected.startDate.getDate() - 7);
    endingDay.setFullYear(weekSelected.startDate.getFullYear());
    endingDay.setMonth(weekSelected.startDate.getMonth());
    endingDay.setDate(weekSelected.startDate.getDate() - 1);
    const lastWeek = `${startingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${endingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    const dates = [];
    const o = endingDay.getDate();
    for (let i = startingDay.getDate(); i !== o + 1; i += 1) {
      if (i > 31) i = 1;
      dates.push(i);
    }
    setWeekSelected({
      text: lastWeek, startDate: startingDay, endDate: endingDay, allDates: dates,
    });
  };
  const nextWeek = () => {
    const startingDay = new Date();
    const endingDay = new Date();
    startingDay.setFullYear(weekSelected.endDate.getFullYear());
    startingDay.setMonth(weekSelected.endDate.getMonth());
    startingDay.setDate(weekSelected.endDate.getDate() + 1);
    endingDay.setFullYear(weekSelected.endDate.getFullYear());
    endingDay.setMonth(weekSelected.endDate.getMonth());
    endingDay.setDate(weekSelected.endDate.getDate() + 7);
    const lastWeek = `${startingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${endingDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    const dates = [];
    const o = endingDay.getDate();
    for (let i = startingDay.getDate(); i !== o + 1; i += 1) {
      if (i > 31) i = 1;
      dates.push(i);
    }
    setWeekSelected({
      text: lastWeek, startDate: startingDay, endDate: endingDay, allDates: dates,
    });
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
      if (!weekSelected.allDates.find(elem => elem === date.getDate())) return;

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
          <button className="dateBtn" type="button" onClick={previousWeek}>
            <i className="fas fa-chevron-circle-left" />
          </button>
          <h4>{weekSelected.text}</h4>
          <button className="dateBtn" type="button" onClick={nextWeek}>
            <i className="fas fa-chevron-circle-right" />
          </button>
        </header>
        <div ref={mealsContainer} className="foodSection p-t p-b max-height-auto">
          <div>
            <div>
              <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Sunday', e)}>
                <h2>Sunday</h2>
                <i className="plus far fa-plus-square" />
                <i className="minus far fa-minus-square" />
              </button>
              <div className="calories">
                <span>Total Calories: </span>
                <span>{caloriesByDay('Sunday')}</span>
              </div>
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
              <div className="calories">
                <span>Total Calories: </span>
                <span>{caloriesByDay('Saturday')}</span>
              </div>
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
            <div>
              <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Thursday', e)}>
                <h2>Thursday</h2>
                <i className="plus far fa-plus-square" />
                <i className="minus far fa-minus-square" />
              </button>
              <div className="calories">
                <span>Total Calories: </span>
                <span>{caloriesByDay('Thursday')}</span>
              </div>
            </div>
            {showDay('Thursday') ? mealByDay('Thursday') : null}
          </div>
          <div>
            <div>
              <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Wednesday', e)}>
                <h2>Wednesday</h2>
                <i className="plus far fa-plus-square" />
                <i className="minus far fa-minus-square" />
              </button>
              <div className="calories">
                <span>Total Calories: </span>
                <span>{caloriesByDay('Wednesday')}</span>
              </div>
            </div>
            {showDay('Wednesday') ? mealByDay('Wednesday') : null}
          </div>
          <div>
            <div>
              <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Tuesday', e)}>
                <h2>Tuesday</h2>
                <i className="plus far fa-plus-square" />
                <i className="minus far fa-minus-square" />
              </button>
              <div className="calories">
                <span>Total Calories: </span>
                <span>{caloriesByDay('Tuesday')}</span>
              </div>
            </div>
            {showDay('Tuesday') ? mealByDay('Tuesday') : null}
          </div>
          <div>
            <div>
              <button className="showDayBtn" data-daydisplayed="+" type="button" onClick={e => toggleDay('Monday', e)}>
                <h2>Monday</h2>
                <i className="plus far fa-plus-square" />
                <i className="minus far fa-minus-square" />
              </button>
              <div className="calories">
                <span>Total Calories: </span>
                <span>{caloriesByDay('Monday')}</span>
              </div>
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
