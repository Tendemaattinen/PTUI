import React from 'react';

import footerStyle from './Footer.module.scss'

function Footer() {
    
    return(
        <footer className={footerStyle.footerBody}>
            <p id={footerStyle.footerLastText}>Footer text</p>
        </footer>
    );
}

export default Footer;