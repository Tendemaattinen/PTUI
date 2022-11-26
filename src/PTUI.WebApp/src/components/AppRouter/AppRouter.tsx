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
import Welcome from "../Welcome/Welcome";
import Editor from "../Editor/Editor";
import UserPreferenceQuestionnaire from "../UserPreferenceQuestionnaire/UserPreferenceQuestionnaire";
import ExampleContent from "../ExampleContent/ExampleContent";
import UserPersonalization from "../UserPersonalization/UserPersonalization";

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="editor" element={<Editor />} />
                <Route path="example" element={<Example />}></Route>
                <Route path="exampleContent" element={<ExampleContent />}></Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="userPreferenceQuestionnaire" element={<UserPreferenceQuestionnaire />} />
                <Route path="userPersonalization" element={<UserPersonalization />} />
            </Routes>
        </>
    )
}

export default AppRouter