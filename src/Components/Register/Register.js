import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../firebase/firebase.init';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [loginSuccess, setLoginSuccess] = useState(false)

    //function for getting email and password on form submission
    const handleSubmit = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            setLoginSuccess(true)
        })
        .catch(error=>{
            console.error('Error: ',error);
            setLoginSuccess(false)
        })
    }
    
    return (
        <div className='w-50 mx-auto border border-3 border-primary p-4 rounded-3'>
            <h2 className='text-danger fw-bold text-center'>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <small><p>Already a user ? <Link to='/login'>Login</Link></p></small>
                {loginSuccess && <p className='text-success fw-bold'>Registration Successful !!</p>}
                
                <div className='text-center'>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Register;