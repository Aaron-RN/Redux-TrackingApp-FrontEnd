import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal, addNote } from '../../redux/actions/index';
// import '../../assets/css/modal.css';

const Modal = ({
  status, modal, selectedFood, closeModal, addNote,
}) => {
  const [note, setNote] = useState({ body: '' });
  console.log(note);

  let modalDisplay = (<div />);

  const { modalType } = modal;
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
            onChange={event => setNote(event.currentTarget.value)}
          />
          <button type="submit">Add Note</button>
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
  const showErrors = form === 'noteForm' ? (
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
  addNote: note => {
    dispatch(addNote(note));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
