import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal, addNote, updateNote } from '../../redux/actions/index';
// import '../../assets/css/modal.css';

const Modal = ({
  status, modal, selectedFood, closeModal, addNote, updateNote,
}) => {
  const [note, setNote] = useState({ body: '' });
  let modalDisplay = (<div />);

  const { modalType, info } = modal;
  useEffect(() => {
    if (info && modalType === 'editNote') {
      setNote({ body: info.body });
    }
  }, []);

  if (modalType === 'addNote') {
    modalDisplay = (
      <div className="addNote">
        <button type="button" onClick={closeModal}>X</button>
        <div>
          <span>Food Selected: </span>
          {selectedFood.name}
        </div>
        <form onSubmit={() => addNote(selectedFood.id, note)} className="noteForm">
          <textarea
            placeholder="Note details"
            name="body"
            type="text"
            value={note.body}
            minLength="3"
            maxLength="450"
            onChange={event => setNote({ body: event.currentTarget.value })}
          />
          <button type="submit">Add Note</button>
        </form>
      </div>
    );
  }
  if (modalType === 'editNote') {
    modalDisplay = (
      <div className="editNote">
        <button type="button" onClick={closeModal}>X</button>
        <div>
          <span>Food Selected: </span>
          {selectedFood.name}
        </div>
        <form onSubmit={() => updateNote(selectedFood.id, { ...info, ...note })} className="noteForm">
          <textarea
            placeholder="Note details"
            name="body"
            type="text"
            value={note.body}
            minLength="3"
            maxLength="450"
            onChange={event => setNote({ body: event.currentTarget.value })}
          />
          <button type="submit">Update Note</button>
        </form>
      </div>
    );
  }
  const { isLoading, errors, form } = status;
  const errorDiv = error => (
    <div key={error}>
      {error}
    </div>
  );
  const showErrors = form === 'modalForm' ? (
    <div className="errors">
      {errors.map(error => errorDiv(error))}
    </div>
  ) : null;

  const renderMain = isLoading
    ? (
      <div className="text-center">
        <div className="loader center" />
        <h1 className="text-white">Loading...</h1>
      </div>
    )
    : (
      <div className="modal">
        <div className="modalContent">
          {showErrors}
          {modalDisplay}
        </div>
      </div>
    );

  return renderMain;
};

Modal.propTypes = {
  modal: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
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
  closeModal: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modal: state.modal,
  status: state.status,
  selectedFood: state.selectedFood,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  },
  addNote: (foodID, note) => {
    dispatch(addNote(foodID, note));
  },
  updateNote: (foodID, note) => {
    dispatch(updateNote(foodID, note));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
