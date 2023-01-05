import React from 'react';
import Toolbar from "../Toolbar/Toolbar";

function Editor() {
    
    const BoldText = () => {
        (document.getElementById('editorTextArea') as HTMLTextAreaElement).style.fontWeight = 'bold';
    }

    const ItalicText = () => {
        (document.getElementById('editorTextArea') as HTMLTextAreaElement).style.fontStyle = 'italic';
    }
    
    return(
        <div>
            <Toolbar/>
            <h1>Editor</h1>
            <input type={"button"} value={'Bold'} onClick={() => BoldText()}/>
            <input type={"button"} value={'Italic'} onClick={() => ItalicText()}/>
            <textarea id={'editorTextArea'}/>
        </div>
    );
}

export default Editor