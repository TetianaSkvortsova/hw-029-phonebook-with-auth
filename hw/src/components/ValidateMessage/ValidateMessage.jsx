import React from 'react';

function ValidateMessage({contactItem, message}) {
    const isEmpty = !contactItem || contactItem.trim().length === 0;

    return (
        <div className="validate-message">
            <span className={isEmpty ? 'shown' : 'hidden'}>
                {message}
            </span>
        </div>
    );
}

export default ValidateMessage;