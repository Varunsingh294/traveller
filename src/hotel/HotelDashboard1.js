import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './HotelDashboard.css';

const cardStyles = {
  listStyle: 'none',
  position: 'relative',
  top: '0',
  paddingLeft: '0',
  marginBottom: '0',
  minWidth: '0',
  paddingTop: '0',
  paddingBottom: '0',
  background: '#fff',
  zIndex: '1',
  opacity: '1',
  display: 'block',
  transition: 'box-shadow 0.15s ease',
  border: '1px solid rgba(0, 0, 0, 0.125)',
  borderRadius: '0.25rem',
  boxSizing: 'border-box',
  boxShadow: 'unset',
};

const HotelDashboard = () => {
  const [activeItems, setActiveItems] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const toggleDropdown = (event, index) => {
    event.preventDefault();
    setActiveItems((prevItems) => {
      const isActive = prevItems.includes(index);
      return isActive ? prevItems.filter((item) => item !== index) : [...prevItems, index];
    });
  };

  const handleItemClick = (index, event) => {
    event.stopPropagation();
    setActiveItems(activeItems);
    setActiveTab(index);
  };

  const logOut = () => {
    sessionStorage.clear();
    window.localStorage.clear();
    window.location.href = "/hotelLogin";
  };

  const menuItems = [
    { label: 'Hotel Info', subItems: ['Hotel Profile', 'Update Hotel Data'] },
    { label: 'Users Info', subItems: ['Add User Data', 'View Users Data'] },
    {
      label: 'Category Info',
      subItems: ['Hotels', 'Tours', 'Rentals', 'Cars', 'Activities'],
    },
    { label: 'Booking Info', subItems: ['Add Booking Data', 'View Booking Data'] },
  ];

  const renderMenu = () => (
    <ul className="main_dropdown">
      {menuItems.map((menuItem, index) => (
        <li key={index} className={activeItems.includes(index) ? 'active' : ''}>
          <Link to="#" onClick={(event) => toggleDropdown(event, index)}>
            {menuItem.label}
            <i className={`fas fa-angle-up ${activeItems.includes(index) ? 'rotate-up' : ''}`}></i>
          </Link>
          {activeItems.includes(index) && (
            <ul className="menu-dropdown">
              {menuItem.subItems.map((subItem, subIndex) => (
                <li key={subIndex} className="menu-item">
                  <Link to="#" onClick={(event) => handleItemClick(subIndex, event)}>
                    {subItem}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      <li style={{ marginTop: '30px' }}>
        <Link to="#" className="logout-btn" onClick={logOut}>
          Logout
        </Link>
      </li>
    </ul>
  );


  // Registration start
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    // hotelImage: Yup.string().url('Invalid URL').required('Hotel Image URL is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match').min(6, 'Confirm Password must be at least 6 characters'),
    // website: Yup.string().url('Invalid URL').required('Website URL is required'),
    // rating: Yup.number().required('Rating is required'),
    // description: Yup.string().required('Description is required'),
  });

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
    hotel_image: '',
    password: '',
    website: '',
    rating: '',
    description: '',
  },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(
          'http://localhost/traveler/hotel_registration_api.php',
          values,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
          console.log('Form submitted successfully');
          resetForm();
        } else {
          console.error('Failed to submit form:', response.data.message);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Registration end



  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const hotelId = localStorage.getItem('hotelId');
    if (hotelId) {
      const fetchHotelData = async () => {
        try {
          const response = await axios.post(
            'http://localhost/traveler/hotel_single_data.php',
            { hotel_id: hotelId },
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (response.status) {
            localStorage.setItem('hotelData', JSON.stringify(response.data[0]));
          } else {
            console.error('Failed to fetch hotel data:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching hotel data:', error);
        }
      };

      fetchHotelData();
    }
  }, []);

  useEffect(() => {
    const storedHotelData = localStorage.getItem('hotelData');
    if (storedHotelData) {
      setHotelData(JSON.parse(storedHotelData));
    } else {
      navigate('/hotelLogin');
    }
  }, [navigate]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 0:
        return hotelProfile;
      case 1:
        return hotelRegistration();
      case 2:
        return 'hii';
      case 3:
        return 'hellow';
      case 4:
        return 'hey';
      case 5:
        return 'bye';
      default:
        return null;
    }
  };

  const hotelProfile = (
    <div className="container mt-5">
      {hotelData && (
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={cardStyles}>
              <div className="card-body text-center">
                <img
                  src="https://www.w3schools.com/howto/img_avatar2.png"
                  alt=""
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="card-title">
                  {hotelData.name}
                </h5>
                <p className="card-text">Hotel</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card" style={cardStyles}>
              <div className="card-header">
                <h5 className="card-title">Hotel Information</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Email:</strong> {hotelData.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Phone:</strong> {hotelData.phone_number}
                  </li>
                  {/* You can add more details as needed */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const hotelRegistration = () => (
    <div className="container mt-5">
      <h2 className="mb-4">Hotel Registration Form</h2>

      <form id="hotelForm" onSubmit={formik.handleSubmit}>
      <div className="row">
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Address', name: 'address', type: 'text' },
          { label: 'City', name: 'city', type: 'text' },
          { label: 'State', name: 'state', type: 'text' },
          { label: 'Country', name: 'country', type: 'text' },
          { label: 'Postal Code', name: 'postalCode', type: 'text' },
          { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Hotel Image URL', name: 'hotelImage', type: 'text' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
          { label: 'Website', name: 'website', type: 'text' },
          { label: 'Rating', name: 'rating', type: 'text' },
          { label: 'Description', name: 'description', type: 'textarea' },
        ].map((field, index) => (
          <div key={index} className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  className={`form-control ${
                    formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''
                  }`}
                  id={field.name}
                  name={field.name}
                  rows="4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name]}
                />
              ) : (
                <input
                  type={field.type}
                  className={`form-control ${
                    formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''
                  }`}
                  id={field.name}
                  name={field.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name]}
                />
              )}
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="invalid-feedback">{formik.errors[field.name]}</div>
              )}
            </div>
          </div>
        ))}
        <div className="col-12 mb-5">
          <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>

    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <nav className="pb-4 adminNav">
            <div id="mySidebar">
              {hotelData && (
                <div className="nalika-profile">
                  <div className="profile-dtl">
                    <Link to="#">
                      <img
                        src="https://www.w3schools.com/howto/img_avatar2.png"
                        alt=""
                        className="img-fluid rounded-circle mb-3"
                      />
                    </Link>
                    <h2>{hotelData.name}</h2>
                  </div>
                </div>
              )}
              {renderMenu()}
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default HotelDashboard;
