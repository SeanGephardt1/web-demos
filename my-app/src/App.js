import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class AMPED extends Component
{
  render()
  {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-welcome">Welcome to React.js using Node.js</div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. I tried that this is way too much overhead. I hate you.
          When will you learn?
        </p>
      </div>
    );
  }
}

export default AMPED;
