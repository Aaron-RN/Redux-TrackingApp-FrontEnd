import React from 'react';
import PropTypes from 'prop-types';
// import '../../assets/css/note.css';

const Note = ({ note }) => (
  <div>
    {note.body}
  </div>
);

Note.propTypes = {
  note: PropTypes.shape({
    body: PropTypes.string,
  }).isRequired,
};

export default Note;
