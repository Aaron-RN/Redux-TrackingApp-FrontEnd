import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowErrors from '../presentational/showErrors';
import {
  closeModal, addNote, updateNote, removeFood, removeNote,
} from '../../redux/actions/index';
// import '../../assets/css/modal.css';

const Modal = ({
  status, modal, selectedFood, closeModal, addNote, updateNote, removeFood, removeNote,
}) => {
  const history = useHistory();

  const [note, setNote] = useState({ body: '' });
  let modalDisplay = (<div />);

  const { modalType, info } = modal;
  useEffect(() => {
    if (info && modalType === 'editNote') {
      setNote({ body: info.body });
    }
  }, [info, modalType]);

  const modalRedirect = (path = '/foods') => {
    closeModal();
    history.push(path);
  };
  if (modalType === 'addNote') {
    modalDisplay = (
      <div className="form modalForm">
        <button type="button" onClick={closeModal}>X</button>
        <h4>Add Note</h4>
        <form
          onSubmit={e => {
            e.preventDefault(); addNote(selectedFood.id, note);
          }}
          className="noteForm"
        >
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
      <div className="form modalForm">
        <button type="button" onClick={closeModal}>X</button>
        <h4>Edit Note</h4>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateNote(selectedFood.id, { ...info, ...note });
            closeModal();
          }}
          className="noteForm"
        >
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
  if (modalType === 'deleteFood') {
    modalDisplay = (
      <div className="form modalForm">
        <button type="button" onClick={closeModal}>X</button>
        <h4>
          {selectedFood.name}
        </h4>
        <p>Are you sure you want to remove this food item?</p>
        <button type="button" onClick={() => { removeFood(selectedFood); modalRedirect(); }}>Remove Food?</button>
      </div>
    );
  }
  if (modalType === 'deleteNote') {
    modalDisplay = (
      <div className="form modalForm">
        <button type="button" onClick={closeModal}>X</button>
        <h4>
          {`${info.body.substring(0, 10)}...`}
        </h4>
        <p>Are you sure you want to remove this note?</p>
        <button type="button" onClick={() => { removeNote(selectedFood.id, info.id); closeModal(); }}>Remove Note?</button>
      </div>
    );
  }
  const { isLoading, errors, form } = status;

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
          {form === 'modalForm' && <ShowErrors errors={errors} />}
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
  removeFood: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
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
  removeFood: food => {
    dispatch(removeFood(food));
  },
  addNote: (foodID, note) => {
    dispatch(addNote(foodID, note));
  },
  updateNote: (foodID, note) => {
    dispatch(updateNote(foodID, note));
  },
  removeNote: (foodID, noteID) => {
    dispatch(removeNote(foodID, noteID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
