import React from 'react';
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <>
            <nav className="navigation-Bar">
                <Link to="/">Example</Link> |{" "}
                <Link to="/login">Login</Link> |{" "}
                <Link to="/register">Register</Link>
            </nav>
        </>
    )
}

export default NavigationBar