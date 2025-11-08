import React, {useContext} from 'react';
import Button from "../Button/Button.jsx";
import './LanguageButton.css';
import {LanguagesContext} from "../../contexts/contexts.js";

function LanguageButton({action}) {
    const language = useContext(LanguagesContext);
    return (
        <>
            <Button
                text={language.language === 'UK' ? 'EN' : 'UK'}
                action={action}
            />
        </>
    );
}

export default LanguageButton;