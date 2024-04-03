import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import "./LoginPage.css";
import {FaUser, FaLock} from "react-icons/fa";
import {Header, Footer} from "../../components";
import {ROUTE} from "../../router";
import {Link, useNavigate} from "react-router-dom";
import { AuthButtons } from "../../components/Header/AuthButtons";
import {loginSuccess} from "../../ducks/login.actions";
import { useDispatch } from 'react-redux';

export function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        username: "",
        password: "",
        rememberMe: false,
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });


    const handleSubmit = () => {
        dispatch(loginSuccess());
        navigate(ROUTE.HOME);
    }

    return (
        <div>
            <Header/>
            <div className="wrapper-container">
                <div className="wrapper">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <h1>Login</h1>
                                <div className="input-box">
                                    <Field type="text" name="username" placeholder="Username"/>
                                    <FaUser className="icon"/>
                                </div>
                                <ErrorMessage name="username" component="div" className="error-message"/>

                                <div className="input-box">
                                    <Field type="password" name="password" placeholder="Password"/>
                                    <FaLock className="icon"/>
                                </div>
                                <ErrorMessage name="password" component="div" className="error-message"/>

                                <div className="remember-forgot">
                                    <label>
                                        <Field type="checkbox" name="rememberMe"/>
                                        Remember me
                                    </label>
                                    <Link to={ROUTE.REGISTRATION}>Forgot password?</Link>
                                </div>

                                <button type="submit">
                                    Login
                                </button>

                                <div className="register-link">
                                    <p>Don't have an account? <Link to={ROUTE.REGISTRATION}>Register</Link></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer/>
            <AuthButtons handleSubmit={handleSubmit} />
        </div>
    );
}
