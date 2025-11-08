import React, {useContext} from 'react';
import ThemeButton from "../components/ThemeButton/ThemeButton.jsx";
import LanguageButton from "../components/LanguageButton/LanguageButton.jsx";
import Header from "../components/Header/Header.jsx";
import ListItem from "../components/ListItem/ListItem.jsx";
import AddContact from "../components/AddContact/AddContact.jsx";
import {UserPositionContext} from "../contexts/contexts.js";
import {Link} from "react-router";

function MainPage({
                      theme,
                      toggleTheme,
                      toggleLanguage,
                      contacts,
                      addContact,
                      disabled,
                      updateContact,
                      deleteContact,
                      newContact,
                      resetNewContactIndex,
                      enableAddButton,
                      deleteNewContact,
                  }) {
    const position = useContext(UserPositionContext);
    return (
        <div>
            <div className="settings">
                <div className="settings-left-controls">
                    <ThemeButton
                        text={theme === 'light' ? 'Dark theme' : 'Light theme'}
                        className={theme === 'light' ? `btn-toggle-theme dark-theme` : `btn-toggle-theme light-theme`}
                        action={toggleTheme}
                    />

                    <LanguageButton action={toggleLanguage}/>
                </div>
                <nav>
                    <Link to="/">Exit</Link> <br/>
                </nav>
            </div>

            <Header/>
            {contacts.length > 0 && (

                <div className={`phone-book ${theme}-theme`}>
                    {position === 'manager' &&
                        <AddContact
                            addContact={addContact}
                            disabled={disabled}
                        />}

                    {contacts.map((contact, index) =>
                        <ListItem
                            contact={contact}
                            key={`${contact.id}-${index}`}
                            onUpdate={updateContact}
                            onDelete={deleteContact}
                            newContactIndex={newContact}
                            index={index}
                            resetNewContactIndex={resetNewContactIndex}
                            enableAddButton={enableAddButton}
                            onCancelNewContact={deleteNewContact}
                            disabled={disabled}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default MainPage;
