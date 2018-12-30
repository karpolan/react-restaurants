import React, { Component } from 'react';
import './App.css';
import CurrentContainer from './containers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img className="logotype rotate" src={"/icon-restaurant.png"} alt="Logotype" />
          <h1>Restaurants</h1>
        </header>
        <CurrentContainer />
        <footer>
          <p>Copyright &copy; <a rel="author" target="_blank" href="https://karpolan.com">KARPOLAN</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
