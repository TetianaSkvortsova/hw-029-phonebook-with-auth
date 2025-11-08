import React from 'react';
import Button from "../Button/Button.jsx";
import './ThemeButton.css';

function ThemeButton({text, className, action}) {

    return (
        <>
            <Button
                text={text}
                className={className}
                action={action}
            />
        </>
    );
}

export default ThemeButton;