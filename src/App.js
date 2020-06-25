import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import registrationPage from './components/functional/registrationPage';
import loginPage from './components/functional/loginPage';
import './assets/css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className="center container">
            <div className="font-header">ARN Calorie Tracker</div>
            <div>
              <div className="horizontal-list">
                <div>
                  <Link to={{
                    pathname: '/register',
                    route_state: {
                      resetPage: true,
                    },
                  }}
                  >
                    <span>Register </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
                <div>
                  <Link to={{
                    pathname: '/login',
                    route_state: {
                      resetPage: true,
                    },
                  }}
                  >
                    <span>Login </span>
                    <i className="fas fa-film" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="logo" />
          </div>
        </nav>
        <main className="App-body">
          <Switch>
            <Route exact path="/login" component={loginPage} />
            <Route exact path="/register" component={registrationPage} />
            <Route exact path="/" component={registrationPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
