import React from 'react';
import { useEffect } from 'react'
import { Link } from "react-router-dom";

import { logout } from "../../reducers/userSlice"

import style from './NavigationBar.module.scss';
import globalStyle from '../../assets/styles/globalStyle.module.scss';

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

function NavigationBar() {
    
    const navbarRef = React.createRef<HTMLDivElement>();
    
    const dispatch = useAppDispatch();
    const { userInfo, userToken } = useAppSelector((state) => state.user)
    
    useEffect(() => {
        if (userInfo) {
            //dispatch(getUserDetails())
            const navbar = navbarRef.current;
            if (navbar !== null) {
                //const style = navbar?.style;
                //style.backgroundColor = "red";
            }
        }
    }, [userInfo, dispatch])
    
    return (
        <>
            <div id={'navbar'} ref={navbarRef} className={`${globalStyle.navbar} ${globalStyle.topNavbar}`}>
                <div className={style.navigationBarLogoDiv}>
                    <p id={style.navigationBarLogo}>PTUI</p>
                </div>
                <nav>
                    <Link className={globalStyle.navbarLink} to="/">Welcome</Link>
                    <Link className={globalStyle.navbarLink} to="/editor">Editor</Link>
                    <Link className={globalStyle.navbarLink} to="/example">Example page</Link>
                    <Link className={globalStyle.navbarLink} to="/exampleContent">Example content page</Link>
                    {/*TODO: Remove when ready, show when user is done personalization*/}
                    <Link className={globalStyle.navbarLink} to="/userPreferenceQuestionnaire">Questionnaire</Link>
                    {/*TODO: If user not done yet, then show*/}
                    <Link className={globalStyle.navbarLink} to="/userPersonalization">Personalization</Link>
                    {
                        (userInfo?.username != null)
                            ?
                            <>
                                <Link className={globalStyle.navbarLink} to="/userPreferenceQuestionnaire">Questionnaire</Link>
                                <a href={"#"} className={globalStyle.navbarLink}>{userInfo.username}</a>
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