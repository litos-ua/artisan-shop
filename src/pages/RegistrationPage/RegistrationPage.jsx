
// import React, { useState } from "react";
// import { TextField, Button, Typography, Box } from "@mui/material";
// import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
// import { Header, Footer } from "../../components";
// import * as Yup from 'yup';
//
// export function RegistrationPage() {
//     const buttonName = "Register";
//
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [nameError, setNameError] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//
//     const validationSchema = Yup.object().shape({
//         name: Yup.string()
//             .min(3, 'Name must be at least 3 characters')
//             .max(20, 'Name cannot be longer than 20 characters')
//             .matches(/^[a-zA-Z0-9_.-]+$/, 'Invalid name format')
//             .required('Name is required'),
//         email: Yup.string()
//             .email("Invalid email address")
//             .required("Email is required"),
//         password: Yup.string()
//             .min(8, "Password must be at least 8 characters")
//             .matches(
//                 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
//                 "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long"
//             )
//             .required("Password is required"),
//     });
//
//     const handleNameChange = (e) => {
//         const value = e.target.value;
//         setName(value);
//         setNameError(
//             value.length >= 3 && value.length <= 20 && /^[a-zA-Z0-9_.-]+$/.test(value)
//                 ? ""
//                 : "Invalid name format"
//         );
//     };
//
//     const handleEmailChange = (e) => {
//         const value = e.target.value;
//         setEmail(value);
//         setEmailError(value.includes("@") ? "" : "Invalid email address");
//     };
//
//     const handlePasswordChange = (e) => {
//         const value = e.target.value;
//         setPassword(value);
//         setPasswordError(value.length >= 8 ? "" : "Password must be at least 8 characters");
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         validationSchema.validate({ name, email, password }, { abortEarly: false })
//             .then(() => {
//                 console.log("Form submitted:", { name, email, password });
//             })
//             .catch((err) => {
//                 console.error("Form contains errors:", err.errors);
//             });
//     };
//
//     return (
//         <Box>
//             <Header />
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
//                 <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                     <Box sx={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px', maxWidth: '400px' }}>
//                         <form onSubmit={handleSubmit}>
//                             <Typography variant="h4" sx={{ marginBottom: "20px" }}>
//                                 Registration
//                             </Typography>
//                             <Box sx={{ width: "100%", marginBottom: "30px" }}>
//                                 <TextField
//                                     type="text"
//                                     label="Name"
//                                     value={name}
//                                     onChange={handleNameChange}
//                                     variant="outlined"
//                                     fullWidth
//                                     required
//                                     error={!!nameError}
//                                     helperText={nameError}
//                                     InputProps={{
//                                         startAdornment: <FaUser />
//                                     }}
//                                 />
//                             </Box>
//                             <Box sx={{ width: "100%", marginBottom: "30px" }}>
//                                 <TextField
//                                     type="text"
//                                     label="Email Address"
//                                     value={email}
//                                     onChange={handleEmailChange}
//                                     variant="outlined"
//                                     fullWidth
//                                     required
//                                     error={!!emailError}
//                                     helperText={emailError}
//                                     InputProps={{
//                                         startAdornment: <FaEnvelope />
//                                     }}
//                                 />
//                             </Box>
//                             <Box sx={{ width: "100%", marginBottom: "30px" }}>
//                                 <TextField
//                                     type="password"
//                                     label="Password"
//                                     value={password}
//                                     onChange={handlePasswordChange}
//                                     variant="outlined"
//                                     fullWidth
//                                     required
//                                     error={!!passwordError}
//                                     helperText={passwordError}
//                                     InputProps={{
//                                         startAdornment: <FaLock />
//                                     }}
//                                 />
//                             </Box>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{ width: "100%" }}>
//                                 {buttonName}
//                             </Button>
//                         </form>
//                     </Box>
//                 </Box>
//             </Box>
//             <Footer />
//         </Box>
//     );
// }

import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Header, Footer } from "../../components";
import * as Yup from 'yup';

export function RegistrationPage() {
    const buttonName = "Register";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(20, 'Name cannot be longer than 20 characters')
            .matches(/^[a-zA-Z0-9_.-]+$/, 'Invalid name format')
            .required('Name is required'),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long"
            )
            .required("Password is required"),
    });

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setNameError(
            value.length >= 3 && value.length <= 20 && /^[a-zA-Z0-9_.-]+$/.test(value)
                ? ""
                : "Invalid name format"
        );
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(value.includes("@") ? "" : "Invalid email address");
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(value.length >= 8 ? "" : "Password must be at least 8 characters");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        validationSchema.validate({ name, email, password }, { abortEarly: false })
            .then(() => {
                console.log("Form submitted:", { name, email, password });
            })
            .catch((err) => {
                console.error("Form contains errors:", err.errors);
            });
    };

    return (
        <Box>
            <Header />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px', maxWidth: '80vw' }}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                                Registration
                            </Typography>
                            <Box sx={{ width: "100%", marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Name"
                                    value={name}
                                    onChange={handleNameChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!nameError}
                                    helperText={nameError}
                                    InputProps={{
                                        startAdornment: <FaUser />
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: "100%", marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Email Address"
                                    value={email}
                                    onChange={handleEmailChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!emailError}
                                    helperText={emailError}
                                    InputProps={{
                                        startAdornment: <FaEnvelope />
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: "100%", marginBottom: "10px" }}>
                                <TextField
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!passwordError}
                                    helperText={passwordError}
                                    InputProps={{
                                        startAdornment: <FaLock />
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: "100%", height: "6vh", marginTop: "10px" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "100%", height: "100%", fontSize: '1rem'}}>
                                    {buttonName}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}

