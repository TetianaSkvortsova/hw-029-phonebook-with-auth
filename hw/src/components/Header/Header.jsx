import React, {useContext} from 'react';
import './Header.css'
import {LanguagesContext, ThemeContext, UserPositionContext} from "../../contexts/contexts.js";

function Header() {
    const theme = useContext(ThemeContext);
    const language = useContext(LanguagesContext);
    const position = useContext(UserPositionContext);

    return (
        <div className={`header ${theme}-theme`}>
            <div className='name'>{language.header.name}</div>
            <div className='lastname'>{language.header.lastname}</div>
            <div className='phone-number'>{language.header.phoneNumber}</div>
            {position==='manager' &&
                <div className='actions'>{language.header.actions}</div>
            }
        </div>
    );
}

export default Header;