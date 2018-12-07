import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar';
import Routes from '../Routes';
import Modal from '../Modal';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
        <Modal />
      </div>
    );
  }
}

export default App;
