import React, {useState} from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router";
import './AuthForm.css';

const AuthSchema = Yup.object({
    login: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});


function AuthForm({setUserPosition}) {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: AuthSchema,
        onSubmit: async (values) => {
            setAuthError('');
            await fetch('db.json')
                .then(response => response.json())
                .then(({users}) => users.filter((item) => item.login === values.login && item.password === values.password))
                .then((result) => {
                    if (result.length > 0) {
                        setUserPosition(result[0].position || '');
                        navigate('/main');
                    } else {
                        setAuthError('Wrong login or password');
                    }
                })
                .catch((error) => {
                    setAuthError('Wrong login or password');
                })
        }
    })
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Authorization Page</h2>
                {authError && <div className="auth-error-center">{authError}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        {formik.errors.login && formik.touched.login ?
                            <div className="auth-error">{formik.errors.login}</div> : null}
                        <input
                            type="text"
                            name="login"
                            value={formik.values.login}
                            placeholder="Enter login"
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password ?
                            <div className="auth-error">{formik.errors.password}</div> : null}
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            placeholder="Enter password"
                            onChange={formik.handleChange}
                        />
                        <button>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;
