import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../presentational/loading';
import Note from '../presentational/note';
import calorieCalculator from '../misc/calorieCalculator';
import { fetchFood, openModal } from '../../redux/actions/index';
import '../../assets/css/meal.css';

const MealDetails = ({
  match, user, selectedFood, status, fetchFood, openModal, redirectTo,
}) => {
  useEffect(() => {
    fetchFood(match.params.id);
  }, [fetchFood, match.params.id]);

  const {
    /* eslint-disable camelcase */
    name, date_consumed, servings_consumed, carbs, fats, proteins,
  } = selectedFood;
  const dateConsumed = new Date(date_consumed);
  const totalCalories = calorieCalculator(servings_consumed, carbs, fats, proteins);
  const { isLoading } = status;
  const renderMain = isLoading
    ? (<Loading />)
    : (
      <div id="MealDetails">
        <div className="name">{name}</div>
        <button className="bareBtn" type="button" onClick={() => openModal('deleteFood')}>
          <i className="fas fa-trash-alt" />
        </button>
        <div className="date">
          {dateConsumed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="servings">
          <span>Servings: </span>
          <span className="mealGrams">{servings_consumed}</span>
        </div>
        <div className="mealDesc">
          <i className="fas fa-bread-slice" />
          <div className="mealFlex">
            <div className="carbs">Carbs</div>
            <div>
              <span className="mealGrams">{carbs.toString()}</span>
              <span> g</span>
            </div>
          </div>
        </div>
        <div className="mealDesc">
          <i className="fas fa-cloud-meatball" />
          <div className="mealFlex">
            <div className="carbs">Fats</div>
            <div>
              <span className="mealGrams">{fats.toString()}</span>
              <span> g</span>
            </div>
          </div>
        </div>
        <div className="mealDesc">
          <i className="fas fa-egg" />
          <div className="mealFlex">
            <div className="carbs">Proteins</div>
            <div>
              <span className="mealGrams">{proteins.toString()}</span>
              <span> g</span>
            </div>
          </div>
        </div>
        <div className="mealCalories">
          <span>Total Calories: </span>
          <span className="mealGrams">{totalCalories.toString()}</span>
        </div>
        <button className="bareBtn addNoteBtn" type="button" onClick={() => openModal('addNote')}>
          Add Note
          <i className="fas fa-comment-dots" />
        </button>
        <div>
          <div className="noteSection">
            <header className="noteHeader">Notes:</header>
            {selectedFood.notes.map(note => (
              <Note key={note.id + name} note={note} openModal={openModal} />
            ))}
          </div>
        </div>
      </div>
    );
  const { logged_in } = user;
  return !logged_in ? redirectTo('/login')
    : renderMain;
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
  status: PropTypes.instanceOf(Object).isRequired,
  openModal: PropTypes.func.isRequired,
  fetchFood: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  selectedFood: state.selectedFood,
  status: state.status,
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
