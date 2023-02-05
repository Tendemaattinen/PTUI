import React from 'react';
import { useEffect } from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom";

import {changePreference, logout} from "../../reducers/userSlice"

import style from './NavigationBar.module.scss';
import globalStyle from '../../assets/styles/globalStyle.module.scss';

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";

function NavigationBar() {
    
    const navbarRef = React.createRef<HTMLDivElement>();
    
    const dispatch = useAppDispatch();
    const { userName, userToken } = useAppSelector((state) => state.user)

    const navigate = useNavigate();
    
    useEffect(() => {
        if (userName) {
            const navbar = navbarRef.current;
            if (navbar !== null) {

            }
        }
    }, [userName, dispatch])
    
    const logoutUser = () => {
        dispatch(logout());
        navigate('login');
    }
    
    const resetSettings = async () => {
        let userId: (string | null) = localStorage.getItem('userId') ?? null;
        await UserInterfaceHelpers.setDefaultSettings(userId);
        dispatch(changePreference(4)); //TODO: Test this
    }
    
    return (
        <>
            <div id={'navbar'} ref={navbarRef} className={`${globalStyle.navbar} ${globalStyle.topNavbar}`}>
                {/*<div className={style.navigationBarLogoDiv}>*/}
                {/*    <p id={style.navigationBarLogo}>PTUI</p>*/}
                {/*</div>*/}
                <nav>
                    <Link className={globalStyle.navbarLink} to="/">Welcome</Link>
                    {
                        (userName != null)
                            ?
                            <>
                                <Link className={globalStyle.navbarLink} to="/personalization">Personalization</Link>
                                <Link className={globalStyle.navbarLink} to="/questionnaire">Questionnaire</Link>
                                <Link className={globalStyle.navbarLink} to="/exampleContent">Example content page</Link>
                                <a href={"#"} className={globalStyle.navbarLink} onClick={() => resetSettings()}>Reset settings</a>
                                <a href={"#"} className={globalStyle.navbarLink}>{userName}</a>
                                <a href={"#"} className={globalStyle.navbarLink} onClick={logoutUser}>Logout</a>
                            </>
                            :
                            <>
                                <a href={"#"} className={globalStyle.navbarLink} onClick={() => resetSettings()}>Reset settings</a>
                                <Link className={globalStyle.navbarLink} to="/register">Register</Link>
                                <Link className={globalStyle.navbarLink} to="/login">Login</Link>
                            </>
                    }
                </nav>
            </div>
        </>
    )
}

export default NavigationBar