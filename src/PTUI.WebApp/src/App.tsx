import React from 'react';
import logo from './assets/images/logo.svg';
import { Counter } from './components/counter/Counter';
import { Outlet, Link } from "react-router-dom";
import './App.scss';

import AppRouter from "./components/AppRouter/AppRouter";

function App() {
  return (
    <div className="App">
        <AppRouter/>
    </div>
  );
}

export default App;
