import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFood } from '../../redux/actions/index';
// import '../assets/css/registrationForm.css';

class FoodForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      date_consumed: '',
      servings_consumed: 0,
      carbs: 0,
      fats: 0,
      proteins: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectForm = React.createRef();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    const { addFood } = this.props;

    e.preventDefault();
    addFood(this.state);
    this.reset();
  }

  reset() {
    this.selectForm.current.scrollIntoView({ behavior: 'smooth' });
    this.setState({
      name: '',
      date_consumed: '',
      servings_consumed: 0,
      carbs: 0,
      fats: 0,
      proteins: 0,
    });
  }

  render() {
    const {
      // eslint-disable-next-line camelcase
      name, date_consumed, servings_consumed, carbs, fats, proteins,
    } = this.state;
    const { status } = this.props;
    const { errors, form } = status;
    const errorDiv = error => (
      <div key={error}>
        {error}
      </div>
    );
    const showErrors = form === 'foodForm' ? (
      <div className="errors">
        {errors.map(error => errorDiv(error))}
      </div>
    ) : null;

    return (
      <div className="bg-header round-bottom box-shadow">
        <div className="center max-width-90 border-top">
          <div className="formTitle">Add New food</div>
          {showErrors}
          <form ref={this.selectForm} onSubmit={this.handleSubmit} className="foodForm">
            <div>
              <input
                placeholder="Name of food"
                name="name"
                type="text"
                value={name}
                onChange={this.handleChange}
              />
              <input
                placeholder="Date Consumed"
                name="date_consumed"
                type="date"
                // eslint-disable-next-line camelcase
                value={date_consumed}
                onChange={this.handleChange}
              />
              <input
                placeholder="Number of Servings Consumed"
                name="servings_consumed"
                type="number"
                // eslint-disable-next-line camelcase
                value={servings_consumed}
                onChange={this.handleChange}
              />
              <input
                placeholder="Carbs"
                name="carbs"
                type="number"
                value={carbs}
                onChange={this.handleChange}
              />
              <input
                placeholder="Fats"
                name="fats"
                type="number"
                value={fats}
                onChange={this.handleChange}
              />
              <input
                placeholder="Proteins"
                name="proteins"
                type="number"
                value={proteins}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Add Food</button>
          </form>
        </div>
      </div>
    );
  }
}

FoodForm.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  addFood: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  addFood: food => {
    dispatch(addFood(food));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodForm);
