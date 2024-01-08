import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './HotelLoginSignup.css';

const HotelSignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      phone_number: '',
      email: '',
      password: '', // Add password field
      confirmPassword: '', // Add confirmPassword field
      // website: '',
      // rating: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter the hotel name'),
      address: Yup.string().required('Please enter the hotel address'),
      city: Yup.string().required('Please enter the city'),
      state: Yup.string().required('Please enter the state'),
      country: Yup.string().required('Please enter the country'),
      postal_code: Yup.string().required('Please enter the postal code'),
      phone_number: Yup.string().required('Please enter the phone number'),
      email: Yup.string().email('Invalid email address').required('Please enter the email address'),
      password: Yup.string()
        .required('Please enter a password')
        .min(6, 'Password must be at least 6 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
      // website: Yup.string().required('Please enter the website'),
      // rating: Yup.string().required('Please enter the rating'),
      // description: Yup.string().required('Please enter the description'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Make the API request for hotel registration using Axios
        const hotelResponse = await axios.post(
          'http://localhost/traveler/hotel_registration_api.php',
          values,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Hotel Registration API response:', hotelResponse.data);
        // Optionally, you can handle success and navigate to another page for hotel registration

        toast.success('Registration successful!', { autoClose: 5000 }); // Auto-close after 5 seconds

        // Reset the form after submission
        resetForm();
      } catch (error) {
        console.error('Hotel Registration Axios error:', error);
        // Optionally, you can set specific error messages based on the Axios error for hotel registration
      } finally {
        // Ensure the form is no longer submitting
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="body">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={formik.handleSubmit}>
            {/* Hotel Registration Form */}
            <h3>Hotel Sign Up</h3>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter hotel name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                placeholder="Enter hotel address"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="invalid-feedback">{formik.errors.address}</div>
              )}
            </div>
            <div className="mb-3">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                placeholder="Enter city"
              />
              {formik.touched.city && formik.errors.city && (
                <div className="invalid-feedback">{formik.errors.city}</div>
              )}
            </div>
            <div className="mb-3">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.state && formik.errors.state ? 'is-invalid' : ''}`}
                placeholder="Enter state"
              />
              {formik.touched.state && formik.errors.state && (
                <div className="invalid-feedback">{formik.errors.state}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.country && formik.errors.country ? 'is-invalid' : ''}`}
                placeholder="Enter country"
              />
              {formik.touched.country && formik.errors.country && (
                <div className="invalid-feedback">{formik.errors.country}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Postal Code</label>
              <input
                type="text"
                name="postal_code"
                value={formik.values.postal_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.postal_code && formik.errors.postal_code ? 'is-invalid' : ''}`}
                placeholder="Enter postal code"
              />
              {formik.touched.postal_code && formik.errors.postal_code && (
                <div className="invalid-feedback">{formik.errors.postal_code}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.phone_number && formik.errors.phone_number ? 'is-invalid' : ''}`}
                placeholder="Enter phone number"
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <div className="invalid-feedback">{formik.errors.phone_number}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="text"
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
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
              )}
            </div>
              {/* <div className="mb-3">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control custom-input ${formik.touched.website && formik.errors.website ? 'is-invalid' : ''}`}
                  placeholder="Enter website"
                />
                {formik.touched.website && formik.errors.website && (
                  <div className="invalid-feedback">{formik.errors.website}</div>
                )}
              </div> */}

              {/* <div className="mb-3">
                <label>Rating</label>
                <input
                  type="text"
                  name="rating"
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control custom-input ${formik.touched.rating && formik.errors.rating ? 'is-invalid' : ''}`}
                  placeholder="Enter rating"
                />
                {formik.touched.rating && formik.errors.rating && (
                  <div className="invalid-feedback">{formik.errors.rating}</div>
                )}
              </div> */}
            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control custom-input ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                placeholder="Enter description"
              />
              {/* Remove the validation feedback for description */}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <Link to="/hotelLogin">sign in?</Link>
            </p>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelSignUp;
