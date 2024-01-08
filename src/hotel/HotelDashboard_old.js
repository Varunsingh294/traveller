import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Pagination } from 'react-bootstrap';

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
  const [activeTab, setActiveTab] = useState();
  const [activeItems, setActiveItems] = useState(0);


  const toggleDropdown = (event, index) => {
    event.preventDefault();
    // setActiveItems((prevItems) => {
    //   const isActive = prevItems.includes(index);
    //   return isActive ? prevItems.filter((item) => item !== index) : [...prevItems, index];
    // });

    setActiveTab(index);
    console.log(index);
  };

  const handleItemClick = (index, event) => {
    event.stopPropagation();
    setActiveItems(index);
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
        <li key={index} className={activeTab === index ? 'active' : ''}>
          <Link to="#" onClick={(event) => toggleDropdown(event, index)}>
            {menuItem.label}
            <i className={`fas fa-angle-up ${activeTab === index ? 'rotate-up' : ''}`}></i>
          </Link>
          {activeTab === index && (
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

  const [isSuccess, setIsSuccess] = useState(false);


  const isEditMode = activeTab === null;

  const validationSchema = Yup.lazy((values) => {
    if (isEditMode) {
      return Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
      });
    } else {
      return Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        postal_code: Yup.string().required('Postal Code is required'),
        phone_number: Yup.string().required('Phone Number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        // hotel_image: Yup.string().url('Invalid URL').required('Hotel Image URL is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
        // website: Yup.string().url('Invalid URL').required('Website URL is required'),
        // rating: Yup.string().required('Rating is required'),
        // description: Yup.string().required('Description is required'),
      });
    }
  });



// For handleSubmit
const handleSubmit = async (values, { resetForm, setSubmitting }) => {
  try {
    const response = await axios.post('http://localhost/traveler/hotel_registration_api.php', values);
    console.log('API Response:', response.data);

    setIsSuccess(true);
    resetForm();
    setSubmitting(false);

    // Show success message
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);

  } catch (error) {
    console.error('Error submitting form:', error);
    setSubmitting(false);
  }
};

  // Registration end


// View data start

const [hotels, setHotels] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/traveler/hotels_all_data.php');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [isSuccess]);

const [roomData, setRoomData] = useState([]);

useEffect(() => {
    // Fetch data from your API
    const RoomFetchData = async () => {
      try {
        const response = await fetch('http://localhost/traveler/rooms_all_data_api.php');
        const data = await response.json();

        if (data.status) {
          setRoomData(data.data);
        } else {
          console.error('Error fetching data: ', data.message);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    RoomFetchData();
  }, []);


// Edit Data start

  const [editFormData, setEditFormData] = useState(null);

  const handleEdit = (id) => {
    const hotelToEdit = hotels.find((hotel) => hotel.hotel_id === id);

    setEditFormData(hotelToEdit);
    setActiveTab(null);
  };


// For handleEditSubmit
  const handleEditSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values);
    try {
      const response = await axios.post('http://localhost/traveler/hotel_update.php', values);
      console.log('Update API Response:', response.data);

      const updatedHotels = hotels.map((hotel) =>
        hotel.hotel_id === values.hotel_id ? { ...hotel, ...values } : hotel
      );

      setHotels(updatedHotels);

      resetForm();
      setEditFormData({
        name:'',
        address:'',
        city:'',
        state:'',
        country:'',
        postal_code:'',
        phone_number:'',
        email:'',
        hotel_image:'',
      });

      setSubmitting(false);

      // Show success message
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        // Navigate to the hotelViewData section
          setActiveTab(2);
      }, 5000);
    } catch (error) {
      console.error('Error updating hotel data:', error);
      setSubmitting(false);
    }
  };

const renderSuccessMessage = () => {
    if (isSuccess) {
      return (
        <div className="alert alert-success mt-3" role="alert">
          Update successful!
        </div>
      );
    }
    return null;
  };


// Edit Data end

const handleDelete = async (hotelId) => {
  try {
    // Update the records right away
    const updatedHotels = hotels.filter(hotel => hotel.hotel_id !== hotelId);
    setHotels(updatedHotels);

    
    const response = await axios.post('http://localhost/traveler/hotel_delete.php', {
      hotel_id: hotelId,
    });

    console.log('Delete API Response:', response.data);
    console.log(response);
    if (response.status) {
      console.log('Deletion successful');
    } else {
      console.error('Deletion failed');
      setHotels([...hotels]);
    }
  } catch (error) {
    console.error('Error deleting hotel:', error);
    setHotels([...hotels]);
  }
};


// Filter and Pagination start here

  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const filteredData = hotels.filter((hotel) => {
  const lowerCaseFilter = filter.toLowerCase();
  const nameMatch = hotel.name.toLowerCase().includes(lowerCaseFilter);
  const addressMatch = hotel.address.toLowerCase().includes(lowerCaseFilter);
  const emailMatch = hotel.email.toLowerCase().includes(lowerCaseFilter);

  return nameMatch || addressMatch || emailMatch;
});



  const totalPages = Math.ceil((filter ? filteredData.length : hotels.length) / recordsPerPage);

  const currentRecords = filter
    ? filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
    : hotels.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const clearFilter = () => {
    setFilter('');
    setCurrentPage(1);
  };

  // Filter and Pagination end here


// View data end


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
    try {
      setHotelData(JSON.parse(storedHotelData));
    } catch (error) {
      console.error('Error parsing stored hotel data:', error);
      // Handle the error as needed
    }
  } else {
    navigate('/hotelLogin');
  }
}, [navigate]);


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

  const HotelRegistration = () => (
    <div className="container mt-5">
      <h2 className="mb-4">Hotel Registration</h2>

      <Formik
        initialValues={{
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
          confirmPassword: '',
          website: '',
          rating: '',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form id="hotelForm">
          
          <div className="row">
            {/* Name */}
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field type="text" className="form-control" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
          </div>

          {/* Address */}
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <Field type="text" className="form-control" id="address" name="address" />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>
          </div>

          {/* City */}
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <Field type="text" className="form-control" id="city" name="city" />
              <ErrorMessage name="city" component="div" className="text-danger" />
            </div>
          </div>

          {/* State */}
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <Field type="text" className="form-control" id="state" name="state" />
              <ErrorMessage name="state" component="div" className="text-danger" />
            </div>
          </div>

          {/* Country */}
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <Field type="text" className="form-control" id="country" name="country" />
              <ErrorMessage name="country" component="div" className="text-danger" />
            </div>
          </div>

          {/* Postal Code */}
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">
                Postal Code
              </label>
              <Field type="text" className="form-control" id="postalCode" name="postal_code" />
              <ErrorMessage name="postal_code" component="div" className="text-danger" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <Field type="text" className="form-control" id="phoneNumber" name="phone_number" />
              <ErrorMessage name="phone_number" component="div" className="text-danger" />
            </div>
          </div>

          {/* Email */}
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field type="email" className="form-control" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
          </div>

            {/* Hotel Image URL */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="hotelImage" className="form-label">
                  Hotel Image URL
                </label>
                <Field type="text" className="form-control" id="hotelImage" name="hotel_image" />
                <ErrorMessage name="hotel_image" component="div" className="text-danger" />
              </div>
            </div>

            {/* Password */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field type="password" className="form-control" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>
            </div>

            {/* Website */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="website" className="form-label">
                  Website
                </label>
                <Field type="text" className="form-control" id="website" name="website" />
                <ErrorMessage name="website" component="div" className="text-danger" />
              </div>
            </div>

            {/* Rating */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <Field type="text" className="form-control" id="rating" name="rating" />
                <ErrorMessage name="rating" component="div" className="text-danger" />
              </div>
            </div>

            {/* Description */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <Field as="textarea" className="form-control" id="description" name="description" rows="4" />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>
            </div>

            <div className="col-12 mb-5">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </Form>

      </Formik>

      {isSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Registration successful! You can now login.
        </div>
      )}

    </div>

  );

  const HotelViewData = () => (

    <div className="container mt-5">
      <h2 className="mb-4">Hotel List</h2>
      <div className="input-group input-group-sm mb-3 justify-content-end">
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="filterInput"
            name="filter"
            placeholder="Filter by name or address..."
            value={filter}
            onChange={handleFilterChange}
            autoComplete="off"
          />
          <button className="btn btn-outline-secondary" type="button" onClick={clearFilter}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-success table-striped text-center">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Country</th>
            <th scope="col">Postal Code</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Hotel Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((hotel, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{hotel.name}</td>
              <td>{hotel.address}</td>
              <td>{hotel.city}</td>
              <td>{hotel.state}</td>
              <td>{hotel.country}</td>
              <td>{hotel.postal_code}</td>
              <td>{hotel.phone_number}</td>
              <td>{hotel.email}</td>
              <td>{hotel.hotel_image}</td>
              <td>
                <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(hotel.hotel_id)}>
                  Edit
                </button>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(hotel.hotel_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination>
        <Pagination.Prev
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </Pagination>

    </div>

  );

  const RenderEditForm = () => (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Hotel</h2>

      <Formik
        initialValues={editFormData}
        validationSchema={validationSchema}
        onSubmit={handleEditSubmit}
      >
        <Form id="editHotelForm">
          <div className="row">
              {/* Name */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field type="text" className="form-control" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
            </div>

            {/* Address */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <Field type="text" className="form-control" id="address" name="address" />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </div>
            </div>

            {/* City */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <Field type="text" className="form-control" id="city" name="city" />
                <ErrorMessage name="city" component="div" className="text-danger" />
              </div>
            </div>

            {/* State */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <Field type="text" className="form-control" id="state" name="state" />
                <ErrorMessage name="state" component="div" className="text-danger" />
              </div>
            </div>

            {/* Country */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <Field type="text" className="form-control" id="country" name="country" />
                <ErrorMessage name="country" component="div" className="text-danger" />
              </div>
            </div>

            {/* Postal Code */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  Postal Code
                </label>
                <Field type="text" className="form-control" id="postalCode" name="postal_code" />
                <ErrorMessage name="postal_code" component="div" className="text-danger" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <Field type="text" className="form-control" id="phoneNumber" name="phone_number" />
                <ErrorMessage name="phone_number" component="div" className="text-danger" />
              </div>
            </div>

            {/* Email */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field type="email" className="form-control" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
            </div>

            {/* Hotel Image URL */}
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label htmlFor="hotelImage" className="form-label">
                  Hotel Image URL
                </label>
                <Field type="text" className="form-control" id="hotelImage" name="hotel_image" />
                <ErrorMessage name="hotel_image" component="div" className="text-danger" />
              </div>
            </div>

            <div className="col-12 mb-5">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );

  const RoomViewData = () => (

    <div className="container mt-5">
      <h2 className="mb-4">Rooms List</h2>

      <table className="table table-success table-striped text-center">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Hotel Name</th>
            <th scope="col">Room Number</th>
            <th scope="col">Room Capacity</th>
            <th scope="col">Room price</th>
            <th scope="col">Room Booked</th>
            <th scope="col">Room Images</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {roomData.map((room, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{room.hotel_name}</td>
              <td>{room.room_number}</td>
              <td>{room.capacity}</td>
              <td>{room.price}</td>
              <td>{room.is_booked}</td>
              {/* <td>
              //   {room.room_images && (
              //     <div>
              //       {room.room_images.split(',').map((imageName, index) => (
              //         <img
              //           key={index}
              //           src={`path/to/your/images/${imageName.trim()}`}
              //           alt={`Room Image ${index + 1}`}
              //           style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '5px' }}
              //         />
              //       ))}
              //     </div>
              //   )}
              </td> */}
              <td>
                {/* Assuming that room.room_images is a comma-separated string of image names */}
                {room.room_images && (
                  <img
                    src={`/RoomImages/${room.room_images.split(',')[0].trim()}`}
                    alt={`Room ${room.room_number} Image`}
                    style={{ maxWidth: '100px', maxHeight: '50px' }}
                  />
                )}
              </td>
              <td>
                <button type="button" className="btn btn-primary btn-sm mr-2">
                  Edit
                </button>
                <button type="button" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>

    </div>

  );



// Rooms start Here

const [roomRegistrationData, setRoomRegistrationData] = useState({
    hotel_id: '',
    room_number: '',
    capacity: '',
    price: '',
    is_booked: '',
    about_room: '',
    room_facilities: '',
    room_images: [],
  });

  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const files = e.target.files;
    setRoomRegistrationData({ ...roomRegistrationData, room_images: [...files] });
  };


  const RoomRegistrationHandleSubmit = async (e) => {
      e.preventDefault();

      // Validate form data here before submitting
      const validationErrors = {};

      // Add validation for all fields
      if (!roomRegistrationData.hotel_id) {
        validationErrors.hotel_id = 'Hotel ID is required';
      }

      if (!roomRegistrationData.room_number) {
        validationErrors.room_number = 'Room Number is required';
      }

      if (!roomRegistrationData.capacity) {
        validationErrors.capacity = 'Capacity is required';
      }

      if (!roomRegistrationData.price) {
        validationErrors.price = 'Price is required';
      }

      if (!roomRegistrationData.room_images || roomRegistrationData.room_images.length === 0) {
        validationErrors.room_images = 'Room Images are required';
      }

      if (!roomRegistrationData.about_room) {
        validationErrors.about_room = 'About This Room is required';
      }

      // Check if there are validation errors
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      console.log('Before API call');
      console.log('roomRegistrationData:', roomRegistrationData);

      try {
        // Create a new FormData object
        const formData = new FormData();

        // Append each field to the FormData object
        for (const key in roomRegistrationData) {
          if (key === 'room_images') {
            // Handle file uploads separately for 'room_images'
            for (let i = 0; i < roomRegistrationData.room_images.length; i++) {
              formData.append('room_images[]', roomRegistrationData.room_images[i]);
            }
          } else {
            formData.append(key, roomRegistrationData[key]);
          }
        }

        // Send the data to the server using fetch
        const response = await fetch('http://localhost/traveler/room_registration_api.php', {
          method: 'POST',
          body: formData,
        });

        // Handle the response
        const result = await response.json();
        console.log(result);

        // Check if the submission was successful
        if (result.status) {
          // Set the success state to true
          // setIsSuccess(true);

          // Reset the form data
          e.target.reset();
          setRoomRegistrationData({
            hotel_id: '',
            room_number: '',
            capacity: '',
            price: '',
            is_booked: '',
            about_room: '',
            room_facilities: '',
            room_images: [],
          });

          // Clear form errors
          setErrors({});
        } else {
          // Handle error
          console.error('Submission failed:', result.message);
        }
      } catch (error) {
        // Handle fetch or other errors
        console.error('Error:', error);
      }
  };


  const RenderRoomsForm = (
    <div className="container mt-5">
      <h2 className="mb-4">Room Registration</h2>
      <form action="#" onSubmit={RoomRegistrationHandleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6">
            {/* Hotel ID */}
            <div className="mb-3">
              <label htmlFor="hotel_id" className="form-label">
                Hotel ID
              </label>
              <select
                className="form-select"
                id="hotel_id"
                name="hotel_id"
                value={roomRegistrationData.hotel_id}
                onChange={(e) => setRoomRegistrationData({ ...roomRegistrationData, hotel_id: e.target.value })}
              >
                <option value="" disabled>Select Hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel.hotel_id} value={hotel.hotel_id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
              {errors.hotel_id && <div className="text-danger">{errors.hotel_id}</div>}
            </div>
          </div>

          <div className="col-md-6">
            {/* Room Number */}
            <div className="mb-3">
              <label htmlFor="room_number" className="form-label">
                Room Number
              </label>
              <input
                type="text"
                className="form-control"
                id="room_number"
                name="room_number"
                value={roomRegistrationData.room_number}
                onChange={(e) => setRoomRegistrationData({ ...roomRegistrationData, room_number: e.target.value })}
              />
              {errors.room_number && <div className="text-danger">{errors.room_number}</div>}
            </div>
          </div>

          <div className="col-md-6">
            {/* Capacity */}
            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">
                Capacity
              </label>
              <input
                type="text"
                className="form-control"
                id="capacity"
                name="capacity"
                value={roomRegistrationData.capacity}
                onChange={(e) => setRoomRegistrationData({ ...roomRegistrationData, capacity: e.target.value })}
              />
              {errors.capacity && <div className="text-danger">{errors.capacity}</div>}
            </div>
          </div>

          <div className="col-md-6">
            {/* Price */}
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={roomRegistrationData.price}
                onChange={(e) => setRoomRegistrationData({ ...roomRegistrationData, price: e.target.value })}
              />
              {errors.price && <div className="text-danger">{errors.price}</div>}
            </div>
          </div>

          <div className="col-md-6">
            {/* Room Images */}
            <div className="mb-3">
              <label htmlFor="room_images" className="form-label">
                Room Images
              </label>
              <input
                type="file"
                id="room_images"
                className="form-control"
                name="room_images"
                multiple
                onChange={handleFileChange}
              />
              {errors.room_images && <div className="text-danger">{errors.room_images}</div>}
            </div>
          </div>

          <div className="col-md-6">
            {/* About This Room */}
            <div className="mb-3">
              <label htmlFor="about_room" className="form-label">
                About This Room
              </label>
              <textarea
                className="form-control"
                id="about_room"
                name="about_room"
                value={roomRegistrationData.about_room}
                onChange={(e) => setRoomRegistrationData({ ...roomRegistrationData, about_room: e.target.value })}
              />
              {errors.about_room && <div className="text-danger">{errors.about_room}</div>}
            </div>
          </div>
        </div>
        <div className="col-12 mb-5">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {/* Display success message */}
      {isSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Registration successful!
        </div>
      )}
    </div>
  );


  // Update start


  // Update end


// Rooms end Here



// Room_Details start Here

const [hotelRoomData, setHotelRoomData] = useState({
    room_id: '',
    room_name: '',
    room_type: '',
    bed_type: '',
    bed_count: '',
    room_facilities: '',
    room_view: '',
    bathroom_count: '',
    images: [],
    balcony: '',
  });

  const [formErrors, setFormErrors] = useState({});



const RoomDetailsHandleSubmit = async (e) => {
  e.preventDefault();

  // Validate form data here before submitting
  const validationErrors = {};

  // Add validation for all fields (excluding 'images')
  for (const [key, value] of Object.entries(hotelRoomData)) {
    if (!value && key !== 'images') {
      validationErrors[key] = `${key.replace('_', ' ')} is required`;
    }
  }

  if (Object.keys(validationErrors).length > 0) {
    setFormErrors(validationErrors);
    return;
  }

  try {
    // Create a new FormData object
    const formData = new FormData();

    // Append each field to the FormData object
    for (const key in hotelRoomData) {
      if (key === 'images') {
        // Handle file uploads separately
        for (let i = 0; i < hotelRoomData.images.length; i++) {
          formData.append('images[]', hotelRoomData.images[i]);
        }
      } else {
        formData.append(key, hotelRoomData[key]);
      }
    }

    // Send the data to the server using fetch
    const response = await fetch('http://localhost/traveler/room_details_add_api.php', {
      method: 'POST',
      body: formData,
    });

    // Handle the response
    const result = await response.json();
    console.log(result);

    // Check if the submission was successful
    if (result.status) {
      // Set the success state to true
      // setIsSuccess(true);

      // Reset the form data
      e.target.reset();
      setHotelRoomData({
        room_id: '',
        room_name: '',
        room_type: '',
        bed_type: '',
        bed_count: '',
        room_facilities: '',
        room_view: '',
        bathroom_count: '',
        images: '',
        balcony: '',
      });

      // Clear form errors
      setFormErrors({});
    } else {
      // Handle error
      console.error('Submission failed:', result.message);
    }
  } catch (error) {
    // Handle fetch or other errors
    console.error('Error:', error);
  }
};


  const updateImages = (e) => {
    const files = e.target.files;
    setHotelRoomData({ ...hotelRoomData, images: [...files] });
  };


  const RenderRoomDetailsForm = (
    <div className="container mt-5">
      <h2 className="mb-4">Room Details Registration</h2>
      <form action="#" onSubmit={RoomDetailsHandleSubmit} encType="multipart/form-data">
        <div className="row">
          {/* Room ID */}
          <div className="col-md-6 mb-3">
            <label htmlFor="room_id" className="form-label">
              Room ID
            </label>
            <input
              type="text"
              className="form-control"
              id="room_id"
              name="room_id"
              value={hotelRoomData.room_id}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, room_id: e.target.value })}
            />
            {formErrors.room_id && <div className="text-danger">{formErrors.room_id}</div>}
          </div>

          {/* Room Name */}
          <div className="col-md-6 mb-3">
            <label htmlFor="room_name" className="form-label">
              Room Name
            </label>
            <input
              type="text"
              className="form-control"
              id="room_name"
              name="room_name"
              value={hotelRoomData.room_name}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, room_name: e.target.value })}
            />
            {formErrors.room_name && <div className="text-danger">{formErrors.room_name}</div>}
          </div>

          {/* Room Type */}
          <div className="col-md-6 mb-3">
            <label htmlFor="room_type" className="form-label">
              Room Type
            </label>
            <input
              type="text"
              className="form-control"
              id="room_type"
              name="room_type"
              value={hotelRoomData.room_type}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, room_type: e.target.value })}
            />
            {formErrors.room_type && <div className="text-danger">{formErrors.room_type}</div>}
          </div>

          {/* Bed Type */}
          <div className="col-md-6 mb-3">
            <label htmlFor="bed_type" className="form-label">
              Bed Type
            </label>
            <input
              type="text"
              className="form-control"
              id="bed_type"
              name="bed_type"
              value={hotelRoomData.bed_type}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, bed_type: e.target.value })}
            />
            {formErrors.bed_type && <div className="text-danger">{formErrors.bed_type}</div>}
          </div>

          {/* Bed Count */}
          <div className="col-md-6 mb-3">
            <label htmlFor="bed_count" className="form-label">
              Bed Count
            </label>
            <input
              type="text"
              className="form-control"
              id="bed_count"
              name="bed_count"
              value={hotelRoomData.bed_count}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, bed_count: e.target.value })}
            />
            {formErrors.bed_count && <div className="text-danger">{formErrors.bed_count}</div>}
          </div>

          {/* Room Facilities */}
          <div className="col-md-6 mb-3">
            <label htmlFor="room_facilities" className="form-label">
              Room Facilities
            </label>
            <input
              type="text"
              className="form-control"
              id="room_facilities"
              name="room_facilities"
              value={hotelRoomData.room_facilities}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, room_facilities: e.target.value })}
            />
            {formErrors.room_facilities && <div className="text-danger">{formErrors.room_facilities}</div>}
          </div>

          {/* Room View */}
          <div className="col-md-6 mb-3">
            <label htmlFor="room_view" className="form-label">
              Room View
            </label>
            <input
              type="text"
              className="form-control"
              id="room_view"
              name="room_view"
              value={hotelRoomData.room_view}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, room_view: e.target.value })}
            />
            {formErrors.room_view && <div className="text-danger">{formErrors.room_view}</div>}
          </div>

          {/* Bathroom Count */}
          <div className="col-md-6 mb-3">
            <label htmlFor="bathroom_count" className="form-label">
              Bathroom Count
            </label>
            <input
              type="text"
              className="form-control"
              id="bathroom_count"
              name="bathroom_count"
              value={hotelRoomData.bathroom_count}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, bathroom_count: e.target.value })}
            />
            {formErrors.bathroom_count && <div className="text-danger">{formErrors.bathroom_count}</div>}
          </div>

          {/* Images */}
          <div className="col-md-6 mb-3">
            <label htmlFor="images" className="form-label">
              Images
            </label>
            <input
              type="file"
              className="form-control"
              id="images"
              name="images"
              multiple // Allow multiple file selection
              onChange={updateImages}
            />
            {formErrors.images && <div className="text-danger">{formErrors.images}</div>}
          </div>

          {/* Balcony */}
          <div className="col-md-6 mb-3">
            <label htmlFor="balcony" className="form-label">
              Balcony
            </label>
            <input
              type="text"
              className="form-control"
              id="balcony"
              name="balcony"
              value={hotelRoomData.balcony}
              onChange={(e) => setHotelRoomData({ ...hotelRoomData, balcony: e.target.value })}
            />
            {formErrors.balcony && <div className="text-danger">{formErrors.balcony}</div>}
          </div>
        </div>

        {/* Display validation errors */}
       {/* {Object.keys(formErrors).length > 0 && (
          <div className="alert alert-danger mt-3">
            <ul>
              {Object.entries(formErrors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </div>
        )}*/}

        <div className="col-12 mb-5">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );


// Room_Details end Here




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
          {activeItems === 0 && RenderRoomDetailsForm}
          {activeItems === 1 && <HotelRegistration />}
          {activeItems === 2 && <HotelViewData />}
          {activeItems === 3 && RenderRoomsForm}
          {activeItems === 4 && <RoomViewData />}
          {activeItems === 5 && <RenderEditForm />}
          {renderSuccessMessage()}
        </div>
      </div>
    </div>
  );
};

export default HotelDashboard;
