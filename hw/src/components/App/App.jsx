import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {LanguagesContext, ThemeContext, UserPositionContext} from "../../contexts/contexts.js";
import {BrowserRouter, Route, Routes} from "react-router";
import MainPage from "../../pages/MainPage.jsx";
import Page404 from "../../pages/Page404.jsx";
import AuthPage from "../../pages/AuthPage.jsx";

function App() {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        const loadContacts = async () => {
            const response = await fetch('contacts.json');
            const result = await response.json();
            setContacts(result.contacts);
        }
        loadContacts();
    }, []);

    const updateContact = (updatedContact) => {
        setContacts((prevContacts) => (
            prevContacts.map((contact) =>
                contact.id === updatedContact.id ? updatedContact : contact
            )
        ));
    };

    const deleteContact = (id) => {
        const filteredContacts = contacts.reduce((newArray, currentContact) => {
            if (currentContact.id !== id) {
                newArray.push(currentContact);
            }
            return newArray;
        }, [])

        setContacts(filteredContacts);
    }

    const deleteNewContact = (id) => {
        deleteContact(id);
        resetNewContactIndex();
        enableAddButton();
    }

    const [newContact, setNewContact] = useState(-1);
    const resetNewContactIndex = () => {
        setNewContact(-1);
    }

    const [disabled, setDisabled] = useState(false);
    const enableAddButton = () => {
        setDisabled(false);
    }

    const addContact = () => {
        setContacts((prevState) => {
            return [
                {
                    id: Date.now(),
                    name: '',
                    surname: '',
                    phoneNumber: ''
                },
                ...prevState
            ]
        })
        setNewContact(0);
        setDisabled(true);
    }

    const defaultTheme = useContext(ThemeContext);
    const [theme, setTheme] = useState(defaultTheme);
    const toggleTheme = () => {
        setTheme((prevState) => {
            return prevState === 'light' ? 'dark' : 'light';
        });
    }

    const languages = useContext(LanguagesContext);
    const [currentLanguage, setCurrentLanguage] = useState(languages.en);
    const toggleLanguage = () => {
        setCurrentLanguage((prevState) => {
            return prevState === languages.en ? languages.uk : languages.en;
        })
    }

    const position = useContext(UserPositionContext);
    const [userPosition, setUserPosition] = useState(position);
    return (
        <div className={`app-container ${theme}-theme`}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <ThemeContext.Provider value={theme}>
                    <LanguagesContext.Provider value={currentLanguage}>
                        <UserPositionContext.Provider value={userPosition}>
                            <main>
                                <Routes>
                                    <Route path="/main" element={
                                        <MainPage
                                            theme={theme}
                                            toggleTheme={toggleTheme}
                                            toggleLanguage={toggleLanguage}
                                            contacts={contacts}
                                            addContact={addContact}
                                            disabled={disabled}
                                            updateContact={updateContact}
                                            deleteContact={deleteContact}
                                            newContact={newContact}
                                            resetNewContactIndex={resetNewContactIndex}
                                            enableAddButton={enableAddButton}
                                            deleteNewContact={deleteNewContact}
                                        />
                                    }/>
                                    <Route path="/" element={<AuthPage setPosition={setUserPosition}/>}/>
                                    <Route path="*" element={<Page404/>}/>
                                </Routes>
                            </main>
                        </UserPositionContext.Provider>
                    </LanguagesContext.Provider>
                </ThemeContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
