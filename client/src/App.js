import React, {Component} from 'react';
import './App.css';
import './PlayerStats.css';
import {Router, Route, hashHistory} from 'react-router'
import SearcFollowers from './Views/SearchFollowers.js'

class App extends Component {
  render() {
    return (
      <div>
        <SearcFollowers/>
      </div>
    )
  }
}

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

export default App;