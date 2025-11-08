import React from 'react';

function Button({text, action, className, disabled}) {
    return (
        <>
            <button
                type='button'
                onClick={action}
                className={className}
                disabled={disabled}>{text}</button>
        </>
    );
}

export default Button;
