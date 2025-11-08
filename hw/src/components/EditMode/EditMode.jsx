import React, {useContext, useState} from 'react';
import Button from "../Button/Button.jsx";
import ValidateMessage from "../ValidateMessage/ValidateMessage.jsx";
import {LanguagesContext} from "../../contexts/contexts.js";

const phonePattern = /^[0-9]{12}$/;
function EditMode({
                      action,
                      contact,
                      onUpdate,
                      resetNewContactIndex,
                      enableAddButton,
                      onCancelNewContact
                  }) {

    const [contactItem, setContactItem] = useState(contact);
    const [isSaveEnabled, setIsSaveEnabled] = useState(
        !!contact.name.trim() &&
        !!contact.surname.trim() &&
        phonePattern.test(contact.phoneNumber.trim())
    );

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        let newValue = value;

        if (name === 'phoneNumber') {
            newValue = value.replace(/\D/g, '');
        }

        const editingContactItem = {
            ...contactItem,
            [name]: newValue
        };

        setContactItem(editingContactItem);

        const isNameValid = !!editingContactItem.name.trim();
        const isSurnameValid = !!editingContactItem.surname.trim();
        const trimmedPhoneNumber = editingContactItem.phoneNumber.trim();
        const isPhoneValid = phonePattern.test(trimmedPhoneNumber);
        const allFieldsValid = isNameValid && isSurnameValid && isPhoneValid;

        setIsSaveEnabled(allFieldsValid);
    }

    const onSaveUpdate = () => {
        onUpdate(contactItem);
        action();
        if (resetNewContactIndex) {
            resetNewContactIndex();
        }

        if (enableAddButton) {
            enableAddButton();
        }
    }

    const checkValidity = (currentContact) => {
        return !!currentContact.name.trim() &&
            !!currentContact.surname.trim() &&
            phonePattern.test(currentContact.phoneNumber.trim());
    }

    const onCancelUpdate = () => {
        const isCurrentlyValid = checkValidity(contactItem);
        const isNewAndEmpty = contact.name === '' && !isCurrentlyValid;

        if (isNewAndEmpty) {
            onCancelNewContact(contact.id);
        } else {
            action();
            if (resetNewContactIndex) {
                resetNewContactIndex();
            }
            if (enableAddButton) {
                enableAddButton();
            }
        }
    }

    const language = useContext(LanguagesContext);

    return (
        <div className='contact-row'>
            <div>
                <input
                    type="text"
                    name="name"
                    value={contactItem.name}
                    onChange={handleOnChange}
                />
                <ValidateMessage
                    contactItem={contactItem.name}
                    message='Required field'
                />
            </div>
            <div>
                <input
                    type="text"
                    name="surname"
                    value={contactItem.surname}
                    onChange={handleOnChange}
                />
                <ValidateMessage
                    contactItem={contactItem.surname}
                    message='Required field'
                />
            </div>
            <div>
                <input
                    type="text"
                    name="phoneNumber"
                    value={contactItem.phoneNumber}
                    onChange={handleOnChange}
                />
                <ValidateMessage
                    contactItem={contactItem.phoneNumber}
                    message='Required field'
                />
            </div>
            <div className='actions'>
                <Button
                    text={language.buttons.save}
                    className='save-button'
                    action={onSaveUpdate}
                    disabled={!isSaveEnabled}
                />
                <Button
                    text={language.buttons.cancel}
                    action={onCancelUpdate}
                    className='cancel-button'
                />
            </div>
        </div>
    );
}

export default EditMode;