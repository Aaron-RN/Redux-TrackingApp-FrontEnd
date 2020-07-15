import React from 'react';
import PropTypes from 'prop-types';

const Note = ({
  note, openModal,
}) => (
  <div className="noteContainer">
    <div className="note">
      <p>{note.body}</p>
      <button className="bareBtn" type="button" onClick={() => openModal('editNote', note)}>
        <i className="fas fa-edit" />
      </button>
      <button className="bareBtn" type="button" onClick={() => openModal('deleteNote', note)}>
        <i className="fas fa-trash-alt" />
      </button>
    </div>
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
