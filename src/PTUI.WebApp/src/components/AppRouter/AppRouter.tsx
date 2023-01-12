import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route, Link, Router, Navigate,
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
import {useAppSelector} from "../../hooks/hooks";

function AppRouter() {

    const { userName, userToken } = useAppSelector((state) => state.user);

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        return userName ? children : <Navigate to="/" replace />;
    };
    
    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="exampleContent" element={(
                    <ProtectedRoute>
                        <ExampleContent />
                    </ProtectedRoute>
                )}
                />
                <Route path="questionnaire" element={(
                    <ProtectedRoute>
                        <UserPreferenceQuestionnaire />
                    </ProtectedRoute>
                )}
                />
                <Route path="personalization" element={(
                    <ProtectedRoute>
                        <UserPersonalization />
                    </ProtectedRoute>
                    )} 
                />
            </Routes>
        </>
    )
}

export default AppRouter