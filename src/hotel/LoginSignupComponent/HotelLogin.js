import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './HotelLoginSignup.css';


const HotelLogin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Please enter the email address'),
      password: Yup.string().required('Please enter the password'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post('http://localhost/traveler/hotel_login_api.php', values);


        if (response.data.status) {
          // resetForm({ values: { email: '', password: '' } }); // Reset the form fields
          // resetForm();
          formik.resetForm();
          toast.success('Login successful!', {
            autoClose: 5000,
            // style: {
            //   backgroundColor: 'green',
            //   color: 'white',
            // },
          });

          // Store the token, hotel ID, and login status in localStorage
          localStorage.setItem('hotelToken', response.data.token);
          localStorage.setItem('hotelId', response.data.hotel_id);
          localStorage.setItem('hotelLoggedIn', true);


          navigate('/hotelDashboard');
          // window.location.href = "/hotelDashboard";

        } else {
          if (response.data.error === 'invalid_credentials') {
            toast.error('Invalid email and password combination');
          } else {
            toast.error(response.data.message || 'Login failed');
          }
        }
      } catch (error) {
        toast.error('An error occurred while processing your login request');
      } finally {
        setSubmitting(false); // Ensure the form is no longer submitting
      }
    },
  });

  return (
    <div className="body">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={formik.handleSubmit}>
            <h3>Hotel Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <Link to="#">password?</Link>
              <span> or </span>
              <Link to="/hotelSignup">sign up?</Link>
            </p>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelLogin;
