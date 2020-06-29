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
          {mealByDay('Sunday')}
        </div>
        <div>
          <h2>Saturday</h2>
          {mealByDay('Saturday')}
        </div>
        <div>
          <h2>Friday</h2>
          {mealByDay('Friday')}
        </div>
        <div>
          <h2>Thursday</h2>
          {mealByDay('Thursday')}
        </div>
        <div>
          <h2>Wednesday</h2>
          {mealByDay('Wednesday')}
        </div>
        <div>
          <h2>Tuesday</h2>
          {mealByDay('Tuesday')}
        </div>
        <div>
          <h2>Monday</h2>
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
