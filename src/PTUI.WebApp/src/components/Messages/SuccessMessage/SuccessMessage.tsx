import globalStyle from '../../../assets/styles/globalStyle.module.scss';

function SuccessMessage({display, text}: {display: string, text: string}) {
    return(
        <div id={"successMessageSurvey"} className={`${globalStyle.message} ${globalStyle.success}`} style={{display: display}}>{text}</div>
    );
}

export default SuccessMessage;