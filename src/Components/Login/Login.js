import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';

const auth = getAuth(app);

const Login = () => {

    const [showError, setShowError] = useState('')

    const handleLogin = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset();
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




    return (
        <div className='w-50 mx-auto border border-3 border-primary p-4 rounded-3'>
            <Form onSubmit={handleLogin}>
                <h3 className='text-primary fw-bold text-center'>Login Page</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'><small>{showError}</small></p>
                <div className='d-flex align-items-center justify-content-between'>
                    <p><small>Don't have an account? <Link to='/register'>Sign Up</Link></small></p>
                    <p><button type='button' className='btn btn-link'><small>Forget Password</small></button></p>
                </div>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;