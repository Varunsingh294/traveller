import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import bcrypt from 'bcryptjs';
import { Table, Pagination, Alert, Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import EditModal from './EditModal/EditModal';
import './AdminDashboard.css';

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


// form Component start

// const saltRounds = 10;

const addDatavalidationSchema = Yup.object({

  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

});

const addDatainitialValues = {
  adminid: '6',
  fname: '',
  lname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

// form Component End

const handleSubmit = async (values, { resetForm }) => {
    try {
      // const hashedPassword = await bcrypt.hash(values.password, saltRounds);
      // const payload = { ...values, password: hashedPassword };

      const response = await axios.post('http://localhost/traveler/user_registration_api.php', values);

      if (response.status === 200) {
        console.log('Registration successful');
        resetForm();
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

const SuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>User deleted successfully!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


const AdminDashboard = () => {

 const [activeItems, setActiveItems] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

 const [activeTab, setActiveTab] = useState(0);

  const handleItemClick = (index, event) => {
    event.stopPropagation();
    setActiveItems(activeItems);

    setActiveTab(index);
  };

  const logOut = () => {
    sessionStorage.clear();
    window.localStorage.clear();
    window.location.href = "/adminLogin";
  }

  const toggleDropdown = (event, index) => {
    event.stopPropagation();
    setActiveItems((prevActiveItems) => {

      // console.log(prevActiveItems);
      
      const isActive = prevActiveItems.includes(index);
      if (isActive) {
        // Close the dropdown
        return prevActiveItems.filter((item) => item !== index);
      } else {
        // Open the dropdown
        return [...prevActiveItems, index];
      }
    });
  };

  // const closeDropdowns = () => {
  //   setActiveItems([]);
  // };

  // document.addEventListener('click', closeDropdowns);

  // useEffect(() => {
  //     const closeDropdowns = () => {
  //       setActiveItems([]);
  //     };

  //     document.addEventListener('click', closeDropdowns);

  //     return () => {
  //       document.removeEventListener('click', closeDropdowns);
  //     };
  //   }, []);

// uesrs data show start
  const [userData, setUserData] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEdit = (userId) => {
    // Implement your edit logic here
    console.log(`Editing user with ID: ${userId}`);
  };

  const handleUpdateSuccess = (message) => {
    setSuccessMessage(message);
  };

// Delete Data start

  const handleDelete = (userId) => {
    setRecordToDelete(userId);
    setShowDeleteConfirmation(true);
  };

const [showSuccessModal, setShowSuccessModal] = useState(false);

const handleShowSuccessModal = () => {
  setShowSuccessModal(true);
};

const handleCloseSuccessModal = () => {
  setShowSuccessModal(false);
};

const handleConfirmDelete = async () => {
    try {
      const response = await axios.post('http://localhost/traveler/users_delete.php', {
        user_id: recordToDelete,
      });

      if (response.data.status) {
        const updatedUserData = userData.filter(user => user.user_id !== recordToDelete);
        setUserData(updatedUserData);
        handleShowSuccessModal();
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('An error occurred while deleting user data', error);
    } finally {
      setShowDeleteConfirmation(false);
      setRecordToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setRecordToDelete(null);
  };


// Delete Data end


// Filter and Pagination start here

  // const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const filteredData = userData.filter((user) => {
    const fullName = `${user.fname} ${user.lname}`.toLowerCase();
    return fullName.includes(filter.toLowerCase()) || user.email.includes(filter.toLowerCase());
  });

  const totalPages = Math.ceil((filter ? filteredData.length : userData.length) / recordsPerPage);

  const currentRecords = filter
    ? filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
    : userData.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    setCurrentPage(1); // Reset to the first page when the filter changes
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

// edit records start

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleShowEditModal = (userId) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUserId(null);
    setShowEditModal(false);
  };

// edit records end

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/traveler/users_all_data.php');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

// uesrs data show end


// adminProfile show start

  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Retrieve admin data from local storage
    const storedAdminData = localStorage.getItem('adminData');
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    } else {
      // Redirect to login if admin data is not available
      navigate('/adminLogin');
    }
  }, [navigate]);

// adminProfile show end


  const adminProfile = (

    <div className="container mt-5">
      {adminData && (
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
                  {adminData.fname} {adminData.lname}
                </h5>
                <p className="card-text">Admin</p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card" style={cardStyles}>
              <div className="card-header">
                <h5 className="card-title">Admin Information</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Email:</strong> {adminData.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Phone:</strong> {adminData.phone}
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

// updated admin start

  // const [localAdminData, setLocalAdminData] = useState({});
  const [loading, setLoading] = useState(true);

  const getLocalAdminData = JSON.parse(localStorage.getItem('adminData')) || {};
  const localAdminId = JSON.parse(localStorage.getItem('adminId')) || {};

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailId: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().required('Phone is required'),
  });


  const onSubmit = async (values) => {
    console.log('Form submitted with values:', values);

    try {
      const response = await axios.post(
        'http://localhost/traveler/admin_update.php',
        {
          admin_id: values.id,
          fname: values.firstName,
          lname: values.lastName,
          email: values.emailId,
          phone: values.phoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Admin data updated successfully:', response.data);
        window.location.href = "/adminLogin";
      } else {
        console.error('Failed to update admin data:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating admin data:', error);
    }
  };

   useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token-info');
      const adminId = localStorage.getItem('adminId');

      if (token && adminId) {
        try {
          const response = await axios.post(
            'http://localhost/traveler/admin_single_data.php',
            { admin_id: adminId },
            {
              headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${JSON.parse(token).token}`,
              },
            }
          );

          //console.log('varun ' + response);
          if (response.status) {
            // setLocalAdminData(response.data[0]);
            localStorage.setItem('adminData', JSON.stringify(response.data[0]));

            // console.error('Fetching admin data:', response.message);
          } else {
            console.error('Failed to fetch admin data:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching admin data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAdminData();

  }, []);

// updated admin end

  const UpdateAdminForm = () => ( <div className="container-fluid custom-form-background">
    <div className="container">
      <h1 className="text-center">Update Admin</h1>
      <div className="pt-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Formik
            initialValues={{
              id: localAdminId || '',
              firstName: getLocalAdminData.fname || '',
              lastName: getLocalAdminData.lname || '',
              emailId: getLocalAdminData.email || '',
              phoneNumber: getLocalAdminData.phone || '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="row g-3">
              {/* Hidden field for admin ID */}
              <Field type="hidden" name="id" />

              <div className="col-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <Field type="text" className="form-control" id="firstName" name="firstName" />
                <div className="text-danger">
                  <ErrorMessage name="firstName" />
                </div>
              </div>

              <div className="col-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <Field type="text" className="form-control" id="lastName" name="lastName" />
                <div className="text-danger">
                  <ErrorMessage name="lastName" />
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="emailId" className="form-label">
                  Email
                </label>
                <Field type="text" className="form-control" id="emailId" name="emailId" />
                <div className="text-danger">
                  <ErrorMessage name="emailId" />
                </div>
              </div>

              <div className="col-6">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone
                </label>
                <Field type="text" className="form-control" id="phoneNumber" name="phoneNumber" />
                <div className="text-danger">
                  <ErrorMessage name="phoneNumber" />
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Update Admin
                </button>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  </div> );

  const AddUserForm = () => ( <div className="container-fluid custom-form-background">
    <div className="container">
    <h1 className="text-center">User Reegistraion</h1>
      <div className="pt-5">

        <Formik initialValues={addDatainitialValues} validationSchema={addDatavalidationSchema} onSubmit={handleSubmit}>
          <Form className="row g-3">
            <div className="col-6">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <Field type="text" className="form-control" id="fname" name="fname" />
              <ErrorMessage name="fname" component="div" className="invalid-feedback" />
            </div>

            <div className="col-6">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <Field type="text" className="form-control" id="lname" name="lname" />
              <ErrorMessage name="lname" component="div" className="invalid-feedback" />
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field type="text" className="form-control" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>

            <div className="col-6">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <Field type="text" className="form-control" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" className="invalid-feedback" />
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field type="password" className="form-control" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>

            <div className="col-md-6">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </div>
          </Form>
        </Formik>

      </div>
    </div>
  </div> );

  const viewUsersData = ( <div className="container-fluid custom-form-background">
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}

      <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} />

      <Modal show={showDeleteConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <h1 className="text-center">View User Data</h1>
        <div className="pt-5">
          <div className="input-group input-group-sm mb-3 justify-content-end">
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by name or email..."
                value={filter}
                onChange={handleFilterChange}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={clearFilter}>
                Clear
              </button>
            </div>
          </div>
          <Table className="table table-success table-striped text-center">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{indexOfFirstRecord + index + 1}</th>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleShowEditModal(user.user_id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {showEditModal && (
            <EditModal
              show={showEditModal}
              handleClose={handleCloseEditModal}
              userId={selectedUserId}
              userData={userData}
              handleEdit={handleEdit}
              setUserData={setUserData}
              onSuccess={handleUpdateSuccess}
            />
          )}

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
      </div>
  </div> );

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 0:
        return adminProfile;
      case 1:
        return <UpdateAdminForm />;
      case 2:
        return <AddUserForm />;
      case 3:
        return viewUsersData;
      case 4:
        return <AddUserForm />;
      case 5:
        return viewUsersData;
      
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
              {adminData && (
                <div className="nalika-profile">
                  <div className="profile-dtl">
                    <Link to="#">
                      <img
                        src="https://www.w3schools.com/howto/img_avatar2.png"
                        alt=""
                        className="img-fluid rounded-circle mb-3"
                      />
                    </Link>
                    <h2>{adminData.fname} <span className="min-dtn">{adminData.lname}</span></h2>
                  </div>
                </div>
              )};
              <ul className="main_dropdown">
                {Array.from({ length: 4 }, (_, index) => (
                  <li key={index} className={activeItems.includes(index) ? 'active' : ''}>
                    <Link to="#" onClick={(event) => toggleDropdown(event, index)}>
                      {index === 0 ? 'Admin Info' : index === 1 ? 'Users Info' : index === 2 ? 'Category Info' : 'Booking Info'}
                      <i className={`fas fa-angle-up ${activeItems.includes(index) ? 'rotate-up' : ''}`}></i>
                    </Link>
                    {activeItems.includes(index) && (
                      <ul className="menu-dropdown">
                        {index === 0 && (
                          <>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(0, event)}>
                                Admin Profile
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(1, event)}>
                                Update Admin Data
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
                              <Link to="#" onClick={(event) => handleItemClick(4, event)}>
                                Hotels
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(5, event)}>
                                Tours
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(6, event)}>
                                Rentals
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(7, event)}>
                                Cars
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(8, event)}>
                                Activities
                              </Link>
                            </li>
                          </>
                        )}
                        {index === 3 && (
                          <>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(9, event)}>
                                Add Booking Data
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(10, event)}>
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

export default AdminDashboard;
