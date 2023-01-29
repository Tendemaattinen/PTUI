import React from 'react';
import logo from '../../assets/images/logo.svg';
import { Counter } from '../counter/Counter';
import './Example.module.scss';

function Example() {
    return (
        <div>
            <h1>Counter</h1>
            <Counter />
        </div>
    );
}

export default Example;