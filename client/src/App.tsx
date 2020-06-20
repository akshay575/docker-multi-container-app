import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import About from './components/About';
import Fib from './components/Fib';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Fibonacci Generator</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link active" to="/">Home</Link>
              <Link className="nav-item nav-link" to="/about">About</Link>
            </div>
          </div>
        </nav>
        <br />
        <div className="container">
          <Route exact path="/" component={Fib} />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  );
}

export default App;
