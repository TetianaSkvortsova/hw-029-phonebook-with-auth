import React, {useContext} from 'react';
import './AddContact.css';
import {LanguagesContext, ThemeContext} from "../../contexts/contexts.js";

function AddContact({addContact, disabled}) {
    const theme = useContext(ThemeContext);
    const language = useContext(LanguagesContext);

    return (
        <div className="add-contact">
            <button
                className={`add-contact-button ${theme}-theme`}
                type="button"
                onClick={addContact}
                disabled={disabled}>
                <span>{language.buttons.add}</span>
            </button>
        </div>
    );
}

export default AddContact;