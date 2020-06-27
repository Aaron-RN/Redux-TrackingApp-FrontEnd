import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchFoods, removeFood } from '../../redux/actions/index';

const FoodList = ({
  status, foods, fetchFoods, removeFood,
}) => {
  const useMountEffect = func => useEffect(func, []);

  useMountEffect(fetchFoods);

  const mealsContainer = React.useRef(null);

  const { isLoading } = status;
  const renderMain = isLoading
    ? (
      <div className="text-center">
        <div className="loader center" />
        <h1 className="text-white">Loading...</h1>
      </div>
    )
    : (
      <div ref={mealsContainer} className="food-section">
        {foods.map(meal => (
          <div key={meal.id + meal.name}>
            <div>{meal.name}</div>
            <div>{meal.date_consumed}</div>
            <div>{meal.servings_consumed}</div>
            <div>{meal.carbs}</div>
            <div>{meal.fats}</div>
            <div>{meal.proteins}</div>
            <div>Total Calories: </div>
            <button type="button" onClick={() => removeFood(meal)}>Remove Food</button>
          </div>
        ))}
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
