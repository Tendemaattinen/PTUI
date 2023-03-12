import React from 'react';
import upqStyle from './UserPreferenceQuestionnaire.module.scss';
import Review from "../Review/Review";
import VersionSelector from "../VersioSelector/VersionSelector";
import UserAnswers from "../UserAnswers/UserAnswers";

function UserPreferenceQuestionnaire() {
    return(
        <div id={upqStyle.upqComponent}>
            <h1>Version selection</h1>
            <VersionSelector/>
            <Review/>
            <br/>
            <UserAnswers/>
        </div>
    );
}

export default UserPreferenceQuestionnaire;