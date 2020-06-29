import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Note from '../presentational/note';
import { fetchFood, removeFood, openModal, removeNote } from '../../redux/actions/index';
// import '../../assets/css/food.css';

const MealDetails = ({
  match, selectedFood, fetchFood, removeFood, removeNote, openModal,
}) => {
  useEffect(() => {
    fetchFood(match.params.id);
  }, [fetchFood, match.params.id]);

  return (
    <div>
      <div>{selectedFood.name}</div>
      <button type="button" onClick={() => removeFood(selectedFood)}>Remove Food</button>
      <div>{selectedFood.date_consumed}</div>
      <div>{selectedFood.servings_consumed}</div>
      <div>{selectedFood.carbs}</div>
      <div>{selectedFood.fats}</div>
      <div>{selectedFood.proteins}</div>
      <div>Total Calories: </div>
      <div>
        {selectedFood.notes.map(note => (
          <Note key={note.id + selectedFood.name} selectedFood={selectedFood} note={note} removeNote={removeNote} openModal={openModal} />
        ))}
      </div>
      <button type="button" onClick={() => openModal('addNote')}>Add Note</button>
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
  openModal: PropTypes.func.isRequired,
  fetchFood: PropTypes.func.isRequired,
  removeFood: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedFood: state.selectedFood,
});

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, info) => {
    dispatch(openModal(modalType, info));
  },
  fetchFood: foodID => {
    dispatch(fetchFood(foodID));
  },
  removeFood: food => {
    dispatch(removeFood(food));
  },
  removeNote: (foodID, noteID) => {
    dispatch(removeNote(foodID, noteID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
