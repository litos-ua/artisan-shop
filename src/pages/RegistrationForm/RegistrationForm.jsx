import React, {useState} from "react";
import "./RegistrationForm.css"
import {FaUser, FaLock} from "react-icons/fa";
import {HomeButton} from "../../components";
import {Header} from "../../components";
import {Footer} from "../../components";

export function RegistrationForm() {
    const buttonName = "Register";
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(value.includes("@") ? "" : "Invalid email address");
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(value.length >= 6 ? "" : "Password must be at least 6 characters");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailError && !passwordError) {
            console.log("Form submitted:", { email, password });
        } else {
            console.log("Form contains errors. Please fix them.");
        }
    };

    return (
        <div>
            <Header/>
            <div className="wrapper-container">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="email address"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <FaUser className="icon"/>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <FaLock className="icon"/>
                        </div>
                        {passwordError && <p className="error-message">{passwordError}</p>}
                        <button type="submit">
                            <HomeButton buttonName={buttonName}/>
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}