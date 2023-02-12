import React from 'react';

import globalStyle from '../../assets/styles/globalStyle.module.scss';

function Welcome() {
    return(
        <div id={globalStyle.welcomeComponent}>
            <h1>PTUI- Profile tailored user interfaces</h1>
            {/*<h2>About</h2>*/}
            {/*<p>Text about proof of concept</p>*/}
            {/*<p>Proof of concept, DI work, about profile tailored userinterface, concept how to tailor */}
            {/*    user interface according user profile, no user profilization</p>*/}
            <h2>Steps</h2>
            <p>1. Register as a new user</p>
            <p>2. Login with user created in previous step</p>
            <p>3. Complete personalization quiz on Personalization quiz -page</p>
            <p>4. Test every personalization version on Version selection -page</p>
            <p>5. You can test different personalization version on Test page</p>
            <p>6. Select best suited version based on choices you made on Personalization quiz</p>
            <p>7. You can test other variations by doing personalization quiz again</p>
            {/*<p>8. Fill google forms</p>*/}
            <br/>
        </div>
    );
}

export default Welcome