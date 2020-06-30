import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Note from '../presentational/note';
import { fetchFood, openModal } from '../../redux/actions/index';
import '../../assets/css/meal.css';

const MealDetails = ({
  match, user, selectedFood, fetchFood, openModal, redirectToLogin,
}) => {
  useEffect(() => {
    fetchFood(match.params.id);
  }, [fetchFood, match.params.id]);

  const {
    /* eslint-disable camelcase */
    name, date_consumed, servings_consumed, carbs, fats, proteins,
  } = selectedFood;
  const carbCalories = carbs * 4;
  const fatCalories = fats * 9;
  const proteinCalories = proteins * 4;
  const totalCalories = (carbCalories + fatCalories + proteinCalories) * servings_consumed;
  const { logged_in } = user;
  return !logged_in ? redirectToLogin()
    : (
      <div>
        <div>{name}</div>
        <button type="button" onClick={() => openModal('deleteFood')}>Remove Food</button>
        <div>{date_consumed}</div>
        <div>
          <span>Servings: </span>
          {servings_consumed}
        </div>
        <div>
          {carbs}
          <span> g</span>
          <div>
            (
            {carbCalories}
            cal)
          </div>
        </div>
        <div>
          {fats}
          <span> g</span>
          <div>
            (
            {fatCalories}
            cal)
          </div>
        </div>
        <div>
          {proteins}
          <span> g</span>
          <div>
            (
            {proteinCalories}
            cal)
          </div>
        </div>
        <div>
          <span>Total Calories: </span>
          {totalCalories}
        </div>
        <div>
          {selectedFood.notes.map(note => (
            <Note key={note.id + name} note={note} openModal={openModal} />
          ))}
        </div>
        <button type="button" onClick={() => openModal('addNote')}>Add Note</button>
      </div>
    );
};
/* eslint-enable camelcase */

MealDetails.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
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
  openModal: PropTypes.func.isRequired,
  fetchFood: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  selectedFood: state.selectedFood,
});

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, info) => {
    dispatch(openModal(modalType, info));
  },
  fetchFood: foodID => {
    dispatch(fetchFood(foodID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
