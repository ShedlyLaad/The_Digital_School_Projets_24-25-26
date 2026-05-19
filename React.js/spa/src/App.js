import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';

const Home = () => (
  <section className="splashScreen">
    <img src="public/images/Art_Institute_of_Chicago_logo.png" alt="Chicago Art Institute logo" />
  </section>
);

const Search = () => (
  <div>
    <h2>Search Page</h2>
    {}
  </div>
);

const Favorite = () => (
  <div>
    <h2>Favorite Page</h2>
    {}
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <h1>Chicago Art Institute</h1>
            </li>
            <li>
              <NavLink exact to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/search">SEARCH</NavLink>
            </li>
            <li>
              <NavLink to="/favorite">FAVORITE</NavLink>
            </li>
            <li>
              <form>
                <input type="text" />
              </form>
            </li>
          </ul>
        </nav>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/favorite" component={Favorite} />
        </main>
      </div>
    </Router>
  );
};

export default App;
