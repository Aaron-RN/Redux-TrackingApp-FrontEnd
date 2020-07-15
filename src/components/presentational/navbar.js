import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <div className="horizontal-list">
      <Link to={{ pathname: '/addFood' }}>
        <div>
          <i className="fas fa-utensils" />
          <span>Add Calories</span>
        </div>
      </Link>
      <Link to={{ pathname: '/foods' }}>
        <div>
          <i className="fas fa-chart-line" />
          <span>Track.it</span>
        </div>
      </Link>
      <Link to={{ pathname: '/progress' }}>
        <div>
          <i className="fas fa-chart-pie" />
          <span>Progress</span>
        </div>
      </Link>
      <Link to={{ pathname: '/more' }}>
        <i className="fas fa-ellipsis-h" />
        <span>More</span>
      </Link>
    </div>
  </nav>
);

export default NavBar;
