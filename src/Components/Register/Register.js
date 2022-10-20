import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../firebase/firebase.init';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [isPassword, setIsPassword] = useState('');
    

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
            verifyEmail();
            form.reset();
            userNameSet(name)
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
            displayName: name
        } )
        .then(()=>{
            console.log(name);
        })
        .catch(error => {
            console.error("Error: ",error);
        })
    }
    
    return (
        <div className='w-50 mx-auto border border-3 border-primary p-4 rounded-3'>
            <h2 className='text-secondary fw-bold text-center'>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
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
            
                
                
                
                <div className='text-center'>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Register;