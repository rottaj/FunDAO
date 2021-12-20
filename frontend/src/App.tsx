import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import WelcomePage from "./Containers/WelcomePage";
import './App.scss';


export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" element={WelcomePage} />
      </BrowserRouter>
    );
  }

}


