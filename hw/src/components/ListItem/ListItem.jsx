import React, {useEffect, useState} from 'react';
import './ListItem.css';
import EditMode from "../EditMode/EditMode.jsx";
import ViewMode from "../ViewMode/ViewMode.jsx";

function ListItem({
                      contact,
                      onUpdate,
                      onDelete,
                      newContactIndex,
                      index,
                      resetNewContactIndex,
                      enableAddButton,
                      onCancelNewContact,
                      disabled,
                  }) {
    const [action, setAction] = useState(false);
    const toggleAction = () => {
        setAction(prevAction => !prevAction);
    }

    useEffect(() => {
        if (index === newContactIndex && newContactIndex !== null) {
            setAction(true);
        }
    }, [index, newContactIndex]);

    return (
        <div className='list-item'>
            {action ?
                <EditMode
                    contact={contact}
                    action={toggleAction}
                    onUpdate={onUpdate}
                    resetNewContactIndex={resetNewContactIndex}
                    enableAddButton={enableAddButton}
                    onCancelNewContact={onCancelNewContact}
                /> :
                <ViewMode
                    contact={contact}
                    action={toggleAction}
                    onDelete={onDelete}
                    disabled={disabled}
                />
            }
        </div>
    );
}

export default ListItem;