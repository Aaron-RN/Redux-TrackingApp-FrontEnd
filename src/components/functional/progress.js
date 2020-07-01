import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/css/progress.css';
import { fetchFoods } from '../../redux/actions';
import calculateCalories from '../misc/calorieCalculator';

const Progress = ({
  user, foods, fetchFoods, redirectToLogin,
}) => {
  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const totalCalories = () => {
    let caloriesForMeals = 0;
    foods.forEach(meal => {
      const {
        /* eslint-disable camelcase */
        servings_consumed, carbs, fats, proteins,
      } = meal;

      caloriesForMeals += calculateCalories(servings_consumed, carbs, fats, proteins);
      /* eslint-enable camelcase */
    });
    return caloriesForMeals;
  };

  const renderMain = (
    <div id="Progress">
      <header className="progressHeader">
        <h3>Progress report</h3>
      </header>
      <div className="">
        <div className="caloriesEatenTotal">
          <i className="fas fa-cookie-bite" />
          <div>
            <span>Lifetime Calories Eaten: </span>
            {totalCalories()}
          </div>
        </div>
        {/* <div className="caloriesEatenWeekly">
          <i className="fas fa-cookie-bite" />
          <div>
            <span>This Week: </span>
            {totalCalories()}
          </div>
        </div> */}
      </div>
    </div>
  );
  /* eslint-disable camelcase */
  const { logged_in } = user;
  return logged_in ? renderMain : redirectToLogin();
  /* eslint-enable camelcase */
};
Progress.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  foods: PropTypes.instanceOf(Object).isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  fetchFoods: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  foods: state.foods,
});

const mapDispatchToProps = dispatch => ({
  fetchFoods: () => {
    dispatch(fetchFoods());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
