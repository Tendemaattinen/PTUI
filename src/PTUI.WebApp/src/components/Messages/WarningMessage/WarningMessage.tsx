import globalStyle from '../../../assets/styles/globalStyle.module.scss';

function WarningMessage({display, text}: {display: string, text: string}) {
    return(
        <div id={"successMessageSurvey"} className={`${globalStyle.message} ${globalStyle.warning}`} style={{display: display}}>{text}</div>
    );
}

export default WarningMessage;