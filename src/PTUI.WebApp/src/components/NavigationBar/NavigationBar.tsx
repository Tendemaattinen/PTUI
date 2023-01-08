﻿import React from 'react';
import { useEffect } from 'react'
import { Link } from "react-router-dom";

import { logout } from "../../reducers/userSlice"

import style from './NavigationBar.module.scss';
import globalStyle from '../../assets/styles/globalStyle.module.scss';

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

function NavigationBar() {
    
    const navbarRef = React.createRef<HTMLDivElement>();
    
    const dispatch = useAppDispatch();
    const { userName, userToken } = useAppSelector((state) => state.user)
    
    useEffect(() => {
        if (userName) {
            //dispatch(getUserDetails())
            const navbar = navbarRef.current;
            if (navbar !== null) {
                //const style = navbar?.style;
                //style.backgroundColor = "red";
            }
        }
    }, [userName, dispatch])
    
    return (
        <>
            <div id={'navbar'} ref={navbarRef} className={`${globalStyle.navbar} ${globalStyle.topNavbar}`}>
                {/*<div className={style.navigationBarLogoDiv}>*/}
                {/*    <p id={style.navigationBarLogo}>PTUI</p>*/}
                {/*</div>*/}
                <nav>
                    <Link className={globalStyle.navbarLink} to="/">Welcome</Link>
                    {/*<Link className={globalStyle.navbarLink} to="/example">Example page</Link>*/}
                    {
                        (userName != null)
                            ?
                            <>
                                <Link className={globalStyle.navbarLink} to="/personalization">Personalization</Link>
                                <Link className={globalStyle.navbarLink} to="/questionnaire">Questionnaire</Link>
                                <Link className={globalStyle.navbarLink} to="/exampleContent">Example content page</Link>
                                <a href={"#"} className={globalStyle.navbarLink}>{userName}</a>
                                <a href={"#"} className={globalStyle.navbarLink} onClick={() => dispatch(logout())}>Logout</a>
                            </>
                            :
                            <>
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