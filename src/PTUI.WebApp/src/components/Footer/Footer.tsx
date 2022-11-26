import React from 'react';

import footerStyle from './Footer.module.scss'
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";
import {FieldValues, useForm} from "react-hook-form";

function Footer() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    return(
        <footer className={footerStyle.footerBody}>
            <p id={footerStyle.footerLastText}>Footer text</p>
            <form onSubmit={handleSubmit(UserInterfaceHelpers.restoreDefaultSettings)}>
                <p>Restore default settings</p>
            </form>
        </footer>
    );
}

export default Footer;