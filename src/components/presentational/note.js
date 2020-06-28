import React from 'react';
import PropTypes from 'prop-types';
// import '../../assets/css/note.css';

const Note = ({ selectedFood, note, removeNote }) => (
  <div>
    {note.body}
    <button type="button" onClick={() => removeNote(selectedFood.id, note.id)}>Remove Food</button>
  </div>
);

Note.propTypes = {
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
  note: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
  }).isRequired,
  removeNote: PropTypes.func.isRequired,
};

export default Note;
