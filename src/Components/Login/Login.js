import Modal from "react-bootstrap/Modal";
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';
import User from "../User/User";

const auth = getAuth(app);


const Login = () => {

    const [loginUser, setLoginUser] = useState({})
    const [showError, setShowError] = useState('');
    const [show, setShow] = useState(false);
    const [showPage, setShowPage] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const googleSignUp=()=>{
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setShowPage(false);
                setLoginUser(user);
            })
            .catch(error => {
                console.error("Error: ", error);
            })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setMailsent('');
        setShow(true);
        setIsDisabled(false);
        };

    const [mailSent, setMailsent] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const handleLogin = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            setLoginUser(user);
            setShowPage(false);
            // console.log(user);
            form.reset();
            setShowError("Login Successfull !!")
        })
        .catch(error => {
            console.error("Error: ", error);
            // setShowError(error.message);
            if (error.message === "Firebase: Error (auth/wrong-password)."){
                setShowError('Wrong Password')
            }
            else if (error.message === "Firebase: Error (auth/user-not-found)."){
                setShowError("Invalid Email")
            }
            else{
                setShowError('');
            }
        })
    }
    const forgetEmail = (event) => {
        const emails = event.target.mail.value;
        // console.log(emails);
        sendPasswordResetEmail(auth, emails)
        .then(()=>{
            //password reset email sent!
            setMailsent('A password reset mail has been sent in your mail.');
            setIsDisabled(true);

        })
        .catch(error => {
            console.error("Error: ", error);
            console.log(error.message);
            const errorMessage = error.message;
            if (errorMessage == "Firebase: Error (auth/user-not-found)."){
                setMailsent("Mail not found.");
            }
        })
    }

    //signout code -----------------------------
    const manageSignOut = ()=>{
        signOut(auth)
            .then(() => {
                //sign out successful
                console.log("Sign Out Successfully");
                setShowPage(true)
            })
            .catch((error) => {
                //error
            })
    }
    




    return (
        <div>
            {showPage && <div className='w-50 mx-auto border border-3 border-primary p-4 rounded-3'>
                <Form onSubmit={handleLogin}>
                    <h3 className='text-primary fw-bold text-center'>Login Page</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type="password" placeholder="Password" required />
                    </Form.Group>
                    <p className='text-danger'><small>{showError}</small></p>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p><small>Don't have an account? <Link to='/register'>Sign Up</Link></small></p>


                        {/*----- pop up code for forget password -----*/}


                        <p>
                            <Button variant="btn btn-link" onClick={handleShow}>
                                <small>Forget Password</small>
                            </Button>
                        </p>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>


                                <Form onSubmit={forgetEmail}>
                                    <Form.Group className="mb-3" controlId="">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control name='mail' type="email" placeholder="Enter email" required />
                                    </Form.Group>

                                    {<p className="text-success">{mailSent}</p>}
                                    <Button variant="primary" disabled={isDisabled} type="submit" >
                                        Submit
                                    </Button>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </Modal>



                    </div>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>

                </Form>

                <div className='mt-3 d-flex flex-column align-items-center'>
                    <button className='btn btn-danger w-50 mt-2' onClick={googleSignUp}>Signup with Google </button>
                    <button className='btn btn-success w-50 mt-2'>Signup with GitHub </button>
                    <button className='btn btn-primary w-50 mt-2'>Signup with Facebook </button>
                </div>
            </div>}

            {!showPage && <div className="container text-center mt-5">
                <User data={loginUser}></User>
                <button className="btn btn-danger" onClick={manageSignOut}>LogOut</button>
            </div>}

            
            {/* {console.log(loginUser)} */}
            
        </div>
    );
};
export default Login;