import React from 'react';
import PropTypes from 'prop-types';
// import '../../assets/css/note.css';

const Note = ({
  note, openModal,
}) => (
  <div>
    {note.body}
    <button type="button" onClick={() => openModal('editNote', note)}>Edit Note</button>
    <button type="button" onClick={() => openModal('deleteNote', note)}>Remove Note</button>
  </div>
);

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Note;
