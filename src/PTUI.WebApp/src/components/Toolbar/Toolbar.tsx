import React from 'react';
import { useEffect } from 'react'

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

import globalStyle from '../../assets/styles/globalStyle.module.scss';

import toolbarStyle from './Toolbar.module.scss';

function Toolbar() {

    const toolbarRef = React.createRef<HTMLDivElement>();

    const dispatch = useAppDispatch();
    const { userName, userToken } = useAppSelector((state) => state.user)

    useEffect(() => {
        if (userName) {
            //dispatch(getUserDetails())
            const navbar = toolbarRef.current;
            if (navbar !== null) {
                const style = navbar?.style;
                style.backgroundColor = "red";
            }
        }
    }, [userName, dispatch])
    
    return(
        <div className={`${toolbarStyle.toolbar2}`} ref={toolbarRef}>
            <button id={toolbarStyle.tool1}>First button</button>
            <button id={toolbarStyle.tool2}>Second button</button>
            <button id={toolbarStyle.tool3}>Third button</button>
            <button id={toolbarStyle.tool4}>Fourth button</button>
            <button id={toolbarStyle.tool5}>Fifth button</button>
            <button id={toolbarStyle.tool6}>Sixth button</button>
            <button id={toolbarStyle.tool7}>Seventh button</button>
            <button id={toolbarStyle.tool8}>Eighth button</button>
            <button id={toolbarStyle.tool9}>Ninth button</button>
            <button id={toolbarStyle.tool10}>Tenth button</button>
        </div>
    );
}

export default Toolbar;