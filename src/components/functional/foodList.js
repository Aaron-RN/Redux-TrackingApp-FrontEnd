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
        {foods.map(meal => (
          <Food key={meal.id + meal.name} foodsList={foods} meal={meal} removeFood={removeFood} />
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
