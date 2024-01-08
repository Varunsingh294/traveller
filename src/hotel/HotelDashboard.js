import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
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
  const [activeTab, setActiveTab] = useState([]);
  const [activeItems, setActiveItems] = useState(0);
  const [openSubmenus, setOpenSubmenus] = useState([]);

  const toggleDropdown = (event, index) => {
    event.preventDefault();
    setActiveTab((prevTabs) => {
      const isActive = prevTabs.includes(index);
      return isActive ? prevTabs.filter((item) => item !== index) : [...prevTabs, index];
    });
  };

  const handleItemClick = (index, event) => {
    event.stopPropagation();
    setEditFormData(null);
    setRoomToEdit(null);
    setRoomDetailsToEdit(null);
    setActiveItems(index);
  };

  const handleSubmenuToggle = (index) => {
    setOpenSubmenus((prevOpenSubmenus) => {
      return prevOpenSubmenus.includes(index)
        ? prevOpenSubmenus.filter((item) => item !== index)
        : [...prevOpenSubmenus, index];
    });
  };

  const logOut = () => {
    sessionStorage.clear();
    window.localStorage.clear();
    window.location.href = "/hotelLogin";
  };


  const renderMenu = () => (
    <ul className="main_dropdown">
      {Array.from({ length: 4 }, (_, index) => (
        <li key={index} className={activeTab.includes(index) ? 'active' : ''}>
          <Link to="#" onClick={(event) => toggleDropdown(event, index)}>
            {index === 0 ? 'Hotel Info' : index === 1 ? 'Users Info' : index === 2 ? 'Category Info' : 'Booking Info'}
            <i className={`fas fa-angle-up ${activeTab.includes(index) ? 'rotate-up' : ''}`}></i>
          </Link>
          {activeTab.includes(index) && (
            <ul className="menu-dropdown">
              {index === 0 && (
                <>
                  <li className="menu-item">
                    <Link to="#" onClick={(event) => handleItemClick(0, event)}>
                      Hotel Profile
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="#" onClick={(event) => handleItemClick(1, event)}>
                      Update Hotel Data
                    </Link>
                  </li>
                </>
              )}
              {index === 1 && (
                <>
                  <li className="menu-item">
                    <Link to="#" onClick={(event) => handleItemClick(2, event)}>
                      Add User Data
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="#" onClick={(event) => handleItemClick(3, event)}>
                      View Users Data
                    </Link>
                  </li>
                </>
              )}
              {index === 2 && (
                 <>
                 
                  <li className="menu-item">
                    <Link to="#" onClick={() => handleSubmenuToggle(index)}>
                      Hotels
                      <i
                        className={`fas fa-angle-up ${
                          openSubmenus.includes(index) ? 'rotate-up' : ''
                        }`}
                      ></i>
                    </Link>
                    {openSubmenus.includes(index) && (
                      <ul className="submenu">
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(4, event)}>
                            Add Hotel
                          </Link>
                        </li>
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(5, event)}>
                            View Hotel
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="menu-item">
                    <Link to="#" onClick={() => handleSubmenuToggle(index + 1)}>
                      Tours
                      <i
                        className={`fas fa-angle-up ${
                          openSubmenus.includes(index + 1) ? 'rotate-up' : ''
                        }`}
                      ></i>
                    </Link>
                    {openSubmenus.includes(index + 1) && (
                      <ul className="submenu">
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(6, event)}>
                            Add Tours
                          </Link>
                        </li>
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(7, event)}>
                            View Tours
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="menu-item">
                    <Link to="#" onClick={() => handleSubmenuToggle(index + 2)}>
                      Rentals
                      <i
                        className={`fas fa-angle-up ${
                          openSubmenus.includes(index + 2) ? 'rotate-up' : ''
                        }`}
                      ></i>
                    </Link>
                    {openSubmenus.includes(index + 2) && (
                      <ul className="submenu">
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(8, event)}>
                            Add Rentals
                          </Link>
                        </li>
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(9, event)}>
                            View Rentals
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="menu-item">
                    <Link to="#" onClick={() => handleSubmenuToggle(index + 3)}>
                      Cars
                      <i
                        className={`fas fa-angle-up ${
                          openSubmenus.includes(index + 3) ? 'rotate-up' : ''
                        }`}
                      ></i>
                    </Link>
                    {openSubmenus.includes(index + 3) && (
                      <ul className="submenu">
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(10, event)}>
                            Add Cars
                          </Link>
                        </li>
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(11, event)}>
                            View Cars
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="menu-item">
                    <Link to="#" onClick={() => handleSubmenuToggle(index + 4)}>
                      Activities
                      <i
                        className={`fas fa-angle-up ${
                          openSubmenus.includes(index + 4) ? 'rotate-up' : ''
                        }`}
                      ></i>
                    </Link>
                    {openSubmenus.includes(index + 4) && (
                      <ul className="submenu">
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(12, event)}>
                            Add Activities
                          </Link>
                        </li>
                        <li className="submenu-item">
                          <Link to="#" onClick={(event) => handleItemClick(13, event)}>
                            View Activities
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                </>
              )}
              {index === 3 && (
                <>
                  <li className="menu-item">
                    <Link to="#" onClick={(event) => handleItemClick(14, event)}>
                      Add Booking Data
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="#" onClick={(event) => handleItemClick(15, event)}>
                      View Booking Data
                    </Link>
                  </li>
                </>
              )}
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
      // const data = await response.json();
      // setHotels(data);
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [isSuccess]);
console.log(hotels);

const [roomData, setRoomData] = useState([]);

const fetchRoomData = async () => {
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

useEffect(() => {
  fetchRoomData();
}, [isSuccess]);

const [roomDetailsData, setRoomDetailsData] = useState([]);


const fetchRoomDetailsData = async () => {
  try {
    const response = await fetch('http://localhost/traveler/room_details_fetch_all_api.php');
    const data = await response.json();

    if (data.status) {
      setRoomDetailsData(data.data);
    } else {
      console.error('Error fetching room details data: ', data.message);
    }
  } catch (error) {
    console.error('Error fetching room details data: ', error);
  }
};


  useEffect(() => {
    fetchRoomDetailsData();
  }, [isSuccess]); // Empty dependency array means this effect runs once after the initial render

// Edit Data start

  const [editFormData, setEditFormData] = useState(null);

  const handleEdit = (id) => {
    const hotelToEdit = hotels.find((hotel) => hotel.hotel_id === id);

    setEditFormData(hotelToEdit);
    setActiveItems(null);
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
        setEditFormData(null);
          setActiveItems(2);
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



// Assuming that roomData and roomDetailsData are arrays of objects with properties like name, address, email, etc.

// Filter and Pagination start here
const [filter, setFilter] = useState('');
const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 10;
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

// Check if hotels, roomData, and roomDetailsData are defined
const filteredHotels = hotels?.filter((hotel) => {
  const lowerCaseFilter = filter.toLowerCase();
  const nameMatch = hotel.name?.toLowerCase().includes(lowerCaseFilter);
  const addressMatch = hotel.address?.toLowerCase().includes(lowerCaseFilter);
  const emailMatch = hotel.email?.toLowerCase().includes(lowerCaseFilter);

  return nameMatch || addressMatch || emailMatch;
});

const totalPages = Math.ceil((filter ? filteredHotels.length : hotels.length) / recordsPerPage);

const currentRecords = filter
  ? filteredHotels.slice(indexOfFirstRecord, indexOfLastRecord)
  : hotels.slice(indexOfFirstRecord, indexOfLastRecord);

// Similarly, update for roomData and roomDetailsData
const filteredRoomData = roomData?.filter((room) => {
  // Add your filtering logic for room data here
  return /* Your filtering condition */;
});

const filteredRoomDetailsData = roomDetailsData?.filter((roomDetail) => {
  // Add your filtering logic for room details data here
  return /* Your filtering condition */;
});

const currentRoomData = filter
  ? filteredRoomData.slice(indexOfFirstRecord, indexOfLastRecord)
  : roomData.slice(indexOfFirstRecord, indexOfLastRecord);

const currentRoomDetailsData = filter
  ? filteredRoomDetailsData.slice(indexOfFirstRecord, indexOfLastRecord)
  : roomDetailsData.slice(indexOfFirstRecord, indexOfLastRecord);

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
        onSubmit={handleEditSubmit}
      >
        {/* validationSchema={validationSchema} */}
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
            <div className="col-12">{renderSuccessMessage()}</div>
          </div>
        </Form>
      </Formik>
    </div>
  );

  const RoomViewData = () => (

    <div className="container mt-5">
      <h2 className="mb-4">Rooms List</h2>
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
          {currentRoomData.map((room, index) => (
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
                {room.room_images && (
                  <img
                    src={`/RoomImages/${room.room_images.split(',')[0].trim()}`}
                    alt={`Room ${room.room_number}`}
                    style={{ maxWidth: '100px', maxHeight: '50px' }}
                  />
                )}
              </td>
              <td>
                <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleRoomEdit(room.room_id)}>
                  Edit
                </button>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteRoom(room.room_id)}>
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


  //Rooms Update start

  const [roomEditFormData, setRoomEditFormData] = useState({
    hotel_id: '',
    room_number: '',
    capacity: '',
    price: '',
    is_booked: '',
    about_this_room: '',
    room_facilities: '',
    room_images: null,
  });

  const [roomToEdit, setRoomToEdit] = useState(null);

  useEffect(() => {
    if (roomToEdit) {
      setRoomEditFormData({
        hotel_id: roomToEdit.hotel_id,
        room_number: roomToEdit.room_number,
        capacity: roomToEdit.capacity,
        price: roomToEdit.price,
        is_booked: roomToEdit.is_booked,
        about_this_room: roomToEdit.about_this_room,
        room_facilities: roomToEdit.room_facilities,
        room_images: roomToEdit.room_images, 
      });
    }
  }, [roomToEdit]);

  const handleRoomEdit = (id) => {
    const roomToEdit = roomData.find((room) => room.room_id === id);
    setRoomToEdit(roomToEdit);
    setActiveItems(null);
  };

const RoomEditHandleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append('room_id', roomToEdit.room_id);
  formData.append('hotel_id', roomEditFormData.hotel_id);
  formData.append('room_number', roomEditFormData.room_number);
  formData.append('capacity', roomEditFormData.capacity);
  formData.append('price', roomEditFormData.price);
  formData.append('is_booked', roomEditFormData.is_booked);
  formData.append('about_this_room', roomEditFormData.about_this_room);
  formData.append('room_facilities', roomEditFormData.room_facilities);

  // Append each image file to the FormData
  if (roomEditFormData.room_images) {
    for (let i = 0; i < roomEditFormData.room_images.length; i++) {
      formData.append('room_images[]', roomEditFormData.room_images[i]);
    }
  }

  try {
    const response = await fetch('http://localhost/traveler/room_update_api.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setIsSuccess(true);
      e.target.reset();
      setRoomEditFormData({
        hotel_id: '',
        room_number: '',
        capacity: '',
        price: '',
        is_booked: '',
        about_this_room: '',
        room_facilities: '',
        room_images: [],
      });
      // Handle success
      console.log('Update successful!');
      setTimeout(() => {
      setIsSuccess(false);
      setRoomToEdit(null);
      setActiveItems(3);
    }, 5000);

    } else {
      // Handle errors
      console.error('Update failed');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};


  const EditHandleFileChange = (e) => {
    const files = e.target.files;
    setRoomEditFormData({ ...roomEditFormData, room_images: [...files] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRoomEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;

  //   setRoomEditFormData((prevData) => ({
  //     ...prevData,
  //     [name]: name === 'room_images' ? files[0] : value,
  //   }));
  // };

  
const RoomUpdateForm = (
    <div className="container mt-5">
      <h2 className="mb-4">Room Update</h2>
      <form onSubmit={RoomEditHandleSubmit} encType="multipart/form-data">
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
                value={roomEditFormData.hotel_id}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select Hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel.hotel_id} value={hotel.hotel_id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
              {}
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
                value={roomEditFormData.room_number}
                onChange={handleInputChange}
              />
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
                value={roomEditFormData.capacity}
                onChange={handleInputChange}
              />
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
                value={roomEditFormData.price}
                onChange={handleInputChange}
              />
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
                onChange={EditHandleFileChange}
              />
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
                id="about_this_room"
                name="about_this_room"
                value={roomEditFormData.about_this_room}
                onChange={handleInputChange}
              />
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
          Update successful!
        </div>
      )}
    </div>
  );



  //Rooms Update end

 //Rooms Delete end

const handleDeleteRoom = async (room_id) => {
    try {
      const response = await fetch('http://localhost/traveler/room_delete_api.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: room_id,
        }),
      });

      if (response.ok) {
        // Handle success
        console.log('Delete successful!');
        // You might want to update the roomData state or re-fetch the data after deletion
        fetchRoomData();
      } else {
        // Handle errors
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
};


 //Rooms Delete end


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


  const RoomDetailViewData = (

      <div className="container mt-5">
        <h2 className="mb-4">Rooms Details List</h2>
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
              <th scope="col">Room Id</th>
              <th scope="col">Room Name</th>
              <th scope="col">Room Type</th>
              <th scope="col">Bed Type</th>
              <th scope="col">Bed Count</th>
              <th scope="col">Room Facilities</th>
              <th scope="col">Bathroom Count</th>
              <th scope="col">Images</th>
              <th scope="col">Balcony</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRoomDetailsData.map((roomDetail, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{roomDetail.room_id}</td>
                <td>{roomDetail.room_name}</td>
                <td>{roomDetail.room_type}</td>
                <td>{roomDetail.bed_type}</td>
                <td>{roomDetail.bed_count}</td>
                <td>{roomDetail.room_facilities}</td>
                <td>{roomDetail.bathroom_count}</td>
                <td>
                  {roomDetail.images &&
                    roomDetail.images.split(',').map((imageName, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={`/RoomImages/${imageName.trim()}`}
                        alt={`Room Image ${imgIndex + 1}`}
                        style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '5px' }}
                      />
                    ))}
                </td>
                <td>{roomDetail.balcony ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEditRoomDetail(roomDetail.room_detail_id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteRoomDetail(roomDetail.room_detail_id)}
                  >
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


  // Room Details Update start Here

  const handleDeleteRoomDetail = async (room_detail_id) => {
    try {
        const response = await fetch('http://localhost/traveler/room_details_delete_api.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                room_detail_id: room_detail_id,
            }),
        });

        if (response.ok) {
            // Handle success
            console.log('Delete successful!');
            
             // You might want to update the room details list or re-fetch the data after deletion
            // For example, you can call a function to refresh the room details list
            // Update the room details list by fetching the latest data
            fetchRoomDetailsData();
        } else {
            // Handle errors
            console.error('Delete failed');
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
  };

  
    const [roomDetailsToEdit, setRoomDetailsToEdit] = useState(null);

    const handleEditRoomDetail = (room_id) => {
      const roomDetailsToEdit = roomDetailsData.find((roomData) => roomData.room_detail_id === room_id);
      setRoomDetailsToEdit(roomDetailsToEdit);
      console.log(roomDetailsToEdit);
    };

    const updateRoomDetails = async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData();

        // Append each field to the FormData
        formData.append('room_detail_id', roomDetailsToEdit?.room_detail_id || '');
        formData.append('room_name', roomDetailsToEdit?.room_name || '');
        formData.append('room_type', roomDetailsToEdit?.room_type || '');
        formData.append('bed_type', roomDetailsToEdit?.bed_type || '');
        formData.append('bed_count', roomDetailsToEdit?.bed_count || '');
        formData.append('room_facilities', roomDetailsToEdit?.room_facilities || '');
        formData.append('room_view', roomDetailsToEdit?.room_view || '');
        formData.append('bathroom_count', roomDetailsToEdit?.bathroom_count || '');

        // Append each image file to the FormData
        if (roomDetailsToEdit?.images) {
          for (let i = 0; i < roomDetailsToEdit.images.length; i++) {
            formData.append('images[]', roomDetailsToEdit.images[i]);
          }
        }

        formData.append('balcony', roomDetailsToEdit?.balcony || '');

        const response = await fetch('http://localhost/traveler/room_details_update_api.php', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
          // Handle success
          console.log('Update successful!');
          // You might want to reset the form or do something else on success
          setIsSuccess(true);
          e.target.reset();
          setRoomDetailsToEdit({
                room_detail_id: '',
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

            setTimeout(() => {
              setIsSuccess(false);
              setRoomDetailsToEdit(null);
              setActiveItems(6);
            }, 5000);
        } else {
          // Handle errors
          console.error('Update failed');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    const handleRoomDetailsInputChange = (e) => {
      const { name, value } = e.target;

      setRoomDetailsToEdit((prevRoomDetails) => ({
        ...prevRoomDetails,
        [name]: value,
      }));
    };

    const handleRoomDetailsUpdateImages = (e) => {
      const files = e.target.files;
      setRoomDetailsToEdit({ ...roomDetailsToEdit, images: [...files] });
    };

    const RenderRoomDetailsUpdateForm = (
      <div className="container mt-5">
        <h2 className="mb-4">Room Details Registration</h2>
        <form onSubmit={updateRoomDetails} encType="multipart/form-data">
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
                value={roomDetailsToEdit?.room_id || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
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
                value={roomDetailsToEdit?.room_name || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
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
                value={roomDetailsToEdit?.room_type || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
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
                value={roomDetailsToEdit?.bed_type || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
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
                value={roomDetailsToEdit?.bed_count || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
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
                value={roomDetailsToEdit?.room_facilities || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
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
                value={roomDetailsToEdit?.room_view || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
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
                value={roomDetailsToEdit?.bathroom_count || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
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
                multiple
                onChange={handleRoomDetailsUpdateImages}
              />
              {/* Validation error message */}
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
                value={roomDetailsToEdit?.balcony || ''}
                onChange={handleRoomDetailsInputChange}
              />
              {/* Validation error message */}
            </div>

            <div className="col-12 mb-5">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
          </form>
      </div>
    );

  // Room Details Update end Here



// Room_Details end Here


const renderActiveComponent = () => {

    if(editFormData) {
      return <RenderEditForm />;
    }else if (roomToEdit) {
      return RoomUpdateForm;
    }else if(roomDetailsToEdit){
      return RenderRoomDetailsUpdateForm;
    }

    switch (activeItems) {
      case 0:
        return hotelProfile;
      case 1:
        return ;
      case 2:
        return ;
      case 3:
        return ;
      case 4:
        return <HotelRegistration />;
      case 5:
        return <HotelViewData />;
      case 6:
        return RenderRoomsForm;
      case 7:
        return <RoomViewData />;
      case 8:
        return RenderRoomDetailsForm;
      case 9:
        return RoomDetailViewData;
      case 10:
        return ;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <nav className="pb-4 adminNav">
            <div id="mySidebar">
              {/* Adjust the following condition to match your actual data structure */}
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
