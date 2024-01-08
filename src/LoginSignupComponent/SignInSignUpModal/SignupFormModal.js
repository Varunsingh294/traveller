import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginSignupModal from './Modal.js';

const SignupFormModal = ({ show, handleClose }) => {

const [isModalOpen, setIsModalOpen] = useState(false);
// const handleFormModal = () =>{
//   handleClose();
//   setIsModalOpen(true);
// }

  const [signupForm, setSignupForm] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    registerAs: 'normal',
    term: false
  });

  const [error, setError] = useState(null);

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSignupForm({ ...signupForm, [name]: val });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Validate signup form data and the acceptance of terms
    if (signupForm.username && signupForm.email && signupForm.password && signupForm.term) {
      // Handle signup logic, for example, make an API call to register the user
      console.log('Form submitted successfully:', signupForm);
      setError(null); // Clear any previous errors
      handleClose(); // Close the modal after successful submission
    } else {
      setError('Please fill out all required fields and accept the terms');
    }
  };

  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSignupSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={signupForm.username}
              onChange={handleSignupChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="fullname"
              value={signupForm.fullname}
              onChange={handleSignupChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRegisterAs">
            <Form.Check
              type="radio"
              id="normal-user"
              label="Normal User"
              name="registerAs"
              value="normal"
              checked={signupForm.registerAs === 'normal'}
              onChange={handleSignupChange}
            />
            <Form.Check
              type="radio"
              id="partner-user"
              label="Partner User"
              name="registerAs"
              value="partner"
              checked={signupForm.registerAs === 'partner'}
              onChange={handleSignupChange}
            />
          </Form.Group>
          <Form.Group controlId="formTerm">
            <Form.Check
              type="checkbox"
              label="I have read and accept the terms"
              name="term"
              checked={signupForm.term}
              onChange={handleSignupChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          <div className="mt-2 c-grey f14 text-center">
            Already have an account?{' '}
            <Link to="#" onClick={ () =>{
                handleClose(false);
                setIsModalOpen(true);
              }}>
              Log In
            </Link>


          </div>
        </Form>
      </Modal.Body>
    </Modal>
    {isModalOpen && (
    <LoginSignupModal show={true} handleClose={setIsModalOpen} />
    )}
    </>
  );
};

export default SignupFormModal;
