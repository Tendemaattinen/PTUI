import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route, Link, Router,
} from "react-router-dom";

import NavigationBar from "../NavigationBar/NavigationBar";

import Login from '../Login/Login';
import Example from "../Example/Example";
import Register from "../Register/Register";
import {Navbar} from "react-bootstrap";

function AppRouter() {
    return (
        <>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<Example />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </>
    )
}

export default AppRouter