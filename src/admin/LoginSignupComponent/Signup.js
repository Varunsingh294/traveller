import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LoginSignup.css';




const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (formData.firstName === '') {
      newErrors.firstName = 'Please enter your first name';
    }
    if (formData.lastName === '') {
      newErrors.lastName = 'Please enter your last name';
    }
    if (formData.email === '') {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.phone === '') {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (formData.password === '') {
      newErrors.password = 'Please enter your password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (formData.confirmPassword === '') {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {

        // const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

        // Make the API request using Axios
        const response = await axios.post(
          'http://localhost/traveler/admin_registration_api.php',
          {
            fname: formData.firstName,
            lname: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('API response:', response.data);
        navigate('/adminLogin');
        // Optionally, you can handle success and navigate to another page
      } catch (error) {
        console.error('Axios error:', error);

        // Optionally, you can set specific error messages based on the Axios error
      }

      // Reset the form data after submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
    }
  };

  return (
    <div className="body">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`form-control custom-input ${errors.firstName ? 'is-invalid' : ''}`}
                placeholder="First name"
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`form-control custom-input ${errors.lastName ? 'is-invalid' : ''}`}
                placeholder="Last name"
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-control custom-input ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-control custom-input ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Enter phone number"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-control custom-input ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-control custom-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <Link to="/adminLogin">sign in?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
