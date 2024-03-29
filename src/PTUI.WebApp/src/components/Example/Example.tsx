﻿import React from 'react';
import logo from '../../assets/images/logo.svg';
import { Counter } from '../counter/Counter';
import './Example.module.scss';

function Example() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
            </header>
        </div>
    );
}

export default Example;