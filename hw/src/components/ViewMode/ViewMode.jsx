import React, {useContext} from 'react';
import Button from "../Button/Button.jsx";
import './ViewMode.css'
import {LanguagesContext, ThemeContext, UserPositionContext} from "../../contexts/contexts.js";

function ViewMode({contact, action, onDelete, disabled}) {
    const theme = useContext(ThemeContext);
    const language = useContext(LanguagesContext);


    const deleteAction = () => {
        onDelete(contact.id);
    }
    const position = useContext(UserPositionContext);
    return (
        <div className={`contact-row ${theme}-theme`}>
            <div className='name'>{contact.name}</div>
            <div className='last-name'>{contact.surname}</div>
            <div className='phone-number'>{contact.phoneNumber}</div>
            {position==='manager' &&
            <div className='actions'>
                <Button
                    text={language.buttons.delete}
                    action={deleteAction}
                    className='delete-button'
                />
                <Button
                    text={language.buttons.edit}
                    action={action}
                    className={`edit-button`}
                    disabled={disabled}
                />
            </div>
            }
        </div>
    );
}

export default ViewMode;