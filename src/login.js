import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginValidation } from './loginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Validate individual field on change
    const fieldErrors = loginValidation({ ...values, [name]: value });
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Login successful');
        console.log('Login successful:', result.userData);
        // Optionally, handle successful login: redirect, update state, etc.
      } else {
        console.error('Error logging in:', result.error);
        // Handle error accordingly
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error accordingly
    }
  };
  
  
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Log-In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              value={values.email}
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              value={values.password}
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Sign In</button>
          <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
