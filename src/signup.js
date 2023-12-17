import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signupValidation } from './signupValidation';


function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Validate individual field on change
    const fieldErrors = signupValidation({ ...values, [name]: value });
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://admirable-llama-6aa9d1.netlify.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('User registered successfully');
        console.log('Data submitted successfully:', result.data);
        // Optionally, reset the form or redirect the user to a success page
      } else {
        console.error('Error submitting data:', result.error);
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
        <h2>Sign-Up</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input
              type='text'
              placeholder='Enter Name'
              name='name'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
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
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          {errors.serverError && <p className="text-danger">{errors.serverError}</p>}
          <button className='btn btn-success w-100 rounded-0'>Sign Up</button>
          <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log In</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
