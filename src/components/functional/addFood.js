import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../presentational/loading';
import ShowErrors from '../presentational/showErrors';
import { addFood } from '../../redux/actions/index';

class FoodForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      date_consumed: '',
      servings_consumed: '',
      carbs: '',
      fats: '',
      proteins: '',
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
    const {
      // eslint-disable-next-line camelcase
      name, date_consumed, servings_consumed, carbs, fats, proteins,
    } = this.state;
    let newCarbs = 0;
    let newFats = 0;
    let newProteins = 0;
    if (carbs > 0) newCarbs = carbs;
    if (fats > 0) newFats = fats;
    if (proteins > 0) newProteins = proteins;
    const food = {
      name,
      date_consumed,
      servings_consumed,
      carbs: newCarbs,
      fats: newFats,
      proteins: newProteins,
    };

    e.preventDefault();
    addFood(food);
    this.reset();
  }

  reset() {
    this.selectForm.current.scrollIntoView({ behavior: 'smooth' });
    this.setState({
      name: '',
      date_consumed: '',
      servings_consumed: '',
      carbs: '',
      fats: '',
      proteins: '',
    });
  }

  render() {
    const {
      // eslint-disable-next-line camelcase
      name, date_consumed, servings_consumed, carbs, fats, proteins,
    } = this.state;
    const { status } = this.props;
    const { isLoading, errors, form } = status;

    const renderMain = isLoading
      ? (
        <Loading />
      )
      : (
        <div className="max-height-hidden">
          <header className="formTitle">
            <h3>Add a Meal</h3>
            {form === 'foodForm' && <ShowErrors errors={errors} />}
          </header>
          <div className="p-t p-b max-height-auto">
            <form ref={this.selectForm} onSubmit={this.handleSubmit} className="form">
              <div>
                <input
                  placeholder="Name of food"
                  name="name"
                  type="text"
                  value={name}
                  minLength="2"
                  maxLength="60"
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
                  min="1"
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Carbs"
                  name="carbs"
                  type="number"
                  value={carbs}
                  min="0"
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Fats"
                  name="fats"
                  type="number"
                  value={fats}
                  min="0"
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Proteins"
                  name="proteins"
                  type="number"
                  value={proteins}
                  min="0"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit">Add Meal</button>
            </form>
          </div>
        </div>
      );
    const { user, redirectTo } = this.props;
    /* eslint-disable camelcase */
    const { logged_in } = user;
    return logged_in ? renderMain : redirectTo('/login');
    /* eslint-enable camelcase */
  }
}

FoodForm.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  addFood: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  addFood: food => {
    dispatch(addFood(food));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodForm);
