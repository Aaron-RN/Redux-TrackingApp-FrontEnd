import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchFood, removeFood } from '../../redux/actions/index';
// import '../../assets/css/food.css';

const MealDetails = ({ match, selectedFood, fetchFood, removeFood }) => {
  useEffect(() => {
    fetchFood(match.params.id);
  }, [fetchFood]);

  return (
    <div>
      <div>{selectedFood.name}</div>
      <div>{selectedFood.date_consumed}</div>
      <div>{selectedFood.servings_consumed}</div>
      <div>{selectedFood.carbs}</div>
      <div>{selectedFood.fats}</div>
      <div>{selectedFood.proteins}</div>
      <div>Total Calories: </div>
      <button type="button" onClick={() => removeFood(selectedFood)}>Remove Food</button>
    </div>
  );
};

MealDetails.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  selectedFood: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    date_consumed: PropTypes.string,
    servings_consumed: PropTypes.number,
    carbs: PropTypes.number,
    fats: PropTypes.number,
    proteins: PropTypes.number,
    notes: PropTypes.instanceOf(Array),
  }).isRequired,
  fetchFood: PropTypes.func.isRequired,
  removeFood: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
  selectedFood: state.selectedFood,
});

const mapDispatchToProps = dispatch => ({
  fetchFood: foodID => {
    dispatch(fetchFood(foodID));
  },
  removeFood: food => {
    dispatch(removeFood(food));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
