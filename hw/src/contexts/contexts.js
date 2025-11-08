import {createContext} from "react";

const languages = {
    uk: {
        language: 'UK',
        header: {
            name: 'Ім`я',
            lastname: 'Прізвище',
            phoneNumber: 'Телефон',
            actions: 'Дії',
        },
        buttons: {
            delete: 'Видалити',
            edit: 'Редагувати',
            save: 'Зберегти',
            cancel: 'Скасувати',
            add: 'Додати Новий Контакт',
        }
    },
    en: {
        language: 'EN',
        header: {
            name: 'Name',
            lastname: 'Surname',
            phoneNumber: 'Phone Number',
            actions: 'Actions',
        },
        buttons: {
            delete: 'Delete',
            edit: 'Edit',
            save: 'Save',
            cancel: 'Cancel',
            add: 'Add New Contact',
        },
    }
}

export const ThemeContext = createContext('light');
export const LanguagesContext = createContext(languages);
export const UserPositionContext = createContext('seller');