import Modal from "react-bootstrap/Modal";
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';
import User from "../User/User";
import './Login.css'

const auth = getAuth(app);


const Login = () => {

    const [loginUser, setLoginUser] = useState({}) //used for send data to user component
    const [showError, setShowError] = useState(''); //user for warning if email or pass is false
    const [show, setShow] = useState(false); //user in modal
    const [showPage, setShowPage] = useState(true);  //user for show user component page
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [logOutSuccess, setLogOutSuccess] = useState(false);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    //------------fucntion for google authentication
    const googleSignUp=()=>{
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setShowPage(false);
                setLoginUser(user);
                setLoginSuccess(true);
                setLogOutSuccess(false);
            })
            .catch(error => {
                console.error("Error: ", error);
            })
    }

    //--------- fucntion for github authentication
    const gitHubSignUp=()=>{
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setShowPage(false);
                setLoginUser(user);
                setLoginSuccess(true);
                setLogOutSuccess(false);
            })
            .catch(error => {
                console.error("Error: ", error);
            })
    }


    //--------- fucntion for facebook authentication
    const faceBookSignUp =()=>{
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setShowPage(false);
                setLoginUser(user);
                setLoginSuccess(true);
                setLogOutSuccess(false);
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
            setLoginSuccess(true);
            setLogOutSuccess(false);
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
                setShowPage(true);
                setLogOutSuccess(true);
                setLoginSuccess(false);
            })
            .catch((error) => {
                //error
            })
    }
    




    return (
        <div>
            {showPage && <div className='border border-3 border-primary p-4 rounded-3 login-page mb-4'>
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
                    {loginSuccess && <p className='text-success fw-bold'>Login Successful !!</p>}
                    {logOutSuccess && <p className='text-success fw-bold'>Logout Successful !!</p>}
                   
                   
                    <div className='d-md-flex align-items-center justify-content-between'>
                        <p><small>Don't have an account? <Link to='/register'>Sign Up</Link></small></p>


                        {/*----- pop up code for forget password -----*/}


                        <p>
                            <Button className="p-0" variant="btn btn-link" onClick={handleShow}>
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
                    <button className='btn btn-danger w-100 mt-2' onClick={googleSignUp}>Login with Google <i class="fa-brands fa-google"></i> </button>
                    <button className='btn btn-success w-100 mt-2' onClick={gitHubSignUp}>Login with GitHub <i class="fa-brands fa-github"></i> </button>
                    <button className='btn btn-primary w-100 mt-2' onClick={faceBookSignUp}>Login with Facebook <i class="fa-brands fa-square-facebook"></i> </button>
                </div>
            </div>}

            {!showPage && <div className="container text-center mt-5">
                <User data={loginUser}></User>
                <button className="btn btn-danger" onClick={manageSignOut}>Logout</button>
            </div>}

            
            {/* {console.log(loginUser)} */}
            
        </div>
    );
};
export default Login;