import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import About from './components/About';
import Fib from './components/Fib';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to Fibonacci Generator!</p>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/about" component={About} />
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
