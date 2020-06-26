import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchFoods } from '../../redux/actions/index';

const FoodList = ({
  status, food, fetchFoods,
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
        {food.map(meal => (
          <div key={meal.id + meal.name}>
            <div>{meal.name}</div>
            <div>{meal.date_consumed}</div>
            <div>{meal.servings_consumed}</div>
            <div>{meal.carbs}</div>
            <div>{meal.fats}</div>
            <div>{meal.proteins}</div>
            <div>Total Calories: </div>
          </div>
        ))}
      </div>
    );
  return renderMain;
};

FoodList.defaultProps = {
  food: [],
};

FoodList.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  food: PropTypes.instanceOf(Object),
  fetchFoods: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
  food: state.food,
});

const mapDispatchToProps = dispatch => ({
  fetchFoods: () => {
    dispatch(fetchFoods());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodList);
