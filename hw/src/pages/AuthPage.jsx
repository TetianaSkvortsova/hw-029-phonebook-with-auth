import React from 'react';
import AuthForm from "../components/AuthForm/AuthForm.jsx";

function AuthPage({setPosition}) {
    return (
        <>
            <AuthForm setUserPosition={setPosition}/>
        </>
    );
}

export default AuthPage;

