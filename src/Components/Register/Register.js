import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../firebase/firebase.init';
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import User from '../User/User';
const auth = getAuth(app);

const Register  = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [logOutSuccess, setLogOutSuccess] = useState(false);
    const [isPassword, setIsPassword] = useState('');
    const [loginUser, setLoginUser] = useState({}) //used for send data to user component
    const [showPage, setShowPage] = useState(true);  //user for show user component page
    
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    //------------fucntion for google authentication
    const googleSignUp = () => {
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
    const gitHubSignUp = () => {
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
    const faceBookSignUp = () => {
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

    //function for getting email and password on form submission
    const handleSubmit = (event) =>{
        event.preventDefault();
        setLoginSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        // console.log(email, password);

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setIsPassword('Password Must have two Uppercase letter');
            return;
        }
        if(password.length < 6 ){
            setIsPassword('Password must be 6 length long.')
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)){
            setIsPassword('Password must have one special character.');
            return;
        }

        setIsPassword('');

    //connection with firebase form email password authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            setLoginSuccess(true);
            setLogOutSuccess(false); 
            // verifyEmail();
            form.reset();
            userNameSet(name);
            setLoginUser(user);
            setShowPage(false);

        })
        .catch(error=>{
            console.error('Error: ',error);
            setIsPassword(error.message);
        })

    }

    //method for verify email address
    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Email Verification Send");
            })
            .catch(error => {
                console.error("Error: ", error);
            })
    }

    //method for sending user name in registration
    const userNameSet = (name) => {
        updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: '',
        } )
        .then(()=>{
            console.log(name);
        })
        .catch(error => {
            console.error("Error: ",error);
        })
    }

    //signout code -----------------------------
    const manageSignOut = () => {
        signOut(auth)
            .then(() => {
                //sign out successful
                console.log("Sign Out Successfully");
                setShowPage(true);
                setLoginSuccess(false);
                setLogOutSuccess(true);
            })
            .catch((error) => {
                //error
            })
    }
    
    return (
        <div >
            {showPage && <div className='w-50 mx-auto border border-3 border-primary p-4 rounded-3'>
                <h2 className='text-secondary fw-bold text-center'>Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your Name" name='name' required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Your email" name='email' required />
                        <Form.Text className="text-muted" >
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" required />
                        <p className='text-danger'><small>{isPassword}</small></p>
                    </Form.Group>

                    <small><p>Already a user ? <Link to='/login'>Login</Link></p></small>
                    {loginSuccess && <p className='text-success fw-bold'>Registration Successful !!</p>}
                    {logOutSuccess && <p className='text-success fw-bold'>Logout Successful !!</p>}




                    <div className='text-center'>
                        <Button variant="primary" className='' type="submit">
                            Sign Up
                        </Button>
                    </div>
                </Form>

                <div className='mt-3 d-flex flex-column align-items-center'>
                    <button className='btn btn-danger w-50 mt-2' onClick={googleSignUp}>Signup with Google <i class="fa-brands fa-google"></i></button>
                    <button className='btn btn-success w-50 mt-2' onClick={gitHubSignUp}>Signup with GitHub <i class="fa-brands fa-github"></i> </button>
                    <button className='btn btn-primary w-50 mt-2' onClick={faceBookSignUp}>Signup with Facebook <i class="fa-brands fa-square-facebook"></i> </button>
                </div>
            </div>}

            {!showPage && <div className="container text-center mt-5">
                <User data={loginUser}></User>
                <button className="btn btn-danger" onClick={manageSignOut}>LogOut</button>
            </div>}


        </div>
    );
};

export default Register;