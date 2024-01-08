import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import bcrypt from 'bcryptjs';

const LoginSignupModal = ({ show, handleClose }) => {
  const formControlStyles = {
    padding: '10px',
    cursor: 'auto',
    boxShadow: 'none',
    border: '1px solid #dae1e7',
    borderRadius: '3px',
    fontSize: '14px',
    color: 'var(--grey-color, #5E6D77)',
  };

  // const history = useHistory();
  // const navigate = useNavigate();

  // const saltRounds = 10;

  const [activeForm, setActiveForm] = useState('login');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '', // Added confirm password field
    registerAs: 'normal',
    term: false,
  });

  const [error, setError] = useState(null);

  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
    setError(null);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSignupForm({ ...signupForm, [name]: val });
  };



  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  if (loginForm.email && loginForm.password) {
    try {
      const response = await axios.post('http://localhost/traveler/user_login_api.php', {
        email: loginForm.email,
        password: loginForm.password,
      });

      if (response.data.success) {
        setLoginForm({
          email: '',
          password: '',
        });

        // Extract the token and session data from the response
        const { token, sessionData } = response.data;

        // Store the token and session data in localStorage
        window.localStorage.setItem("token-info", JSON.stringify({ token }));
        window.sessionStorage.setItem("session-data", JSON.stringify(sessionData));
        window.localStorage.setItem("loggedIn", true);

        // Authentication successful, handle the logged-in user
        console.log('User logged in successfully');
        // Optionally, you can redirect the user or perform other actions
        setError(null);
        // navigate('/');
        window.location.href = "/";
        handleClose();
      } else {
        // Authentication failed, show an error message
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      // Handle login error
      setError('An error occurred while processing your login request');
    }
  } else {
    setError('Please enter valid login credentials');
  }
};




  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Password and Confirm Password validation
    if (signupForm.password !== signupForm.cpassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate other signup form data and the acceptance of terms
    if (
      signupForm.fname &&
      signupForm.lname &&
      signupForm.email &&
      signupForm.phone &&
      signupForm.password &&
      signupForm.cpassword &&
      signupForm.term
    ) {

      // Check if the password meets the minimum length requirement
      if (signupForm.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // const hashedPassword = await bcrypt.hash(signupForm.password, saltRounds);
    
      axios
        .post('http://localhost/traveler/user_registration_api.php', {
          adminid: '6',
          fname: signupForm.fname,
          lname: signupForm.lname,
          email: signupForm.email,
          phone: signupForm.phone,
          password: signupForm.password,
        })
        .then((response) => {
          // Axios handles success status (2xx) automatically
          // Handle successful registration
          setSignupForm({
                          fname: '',
                          lname: '',
                          email: '',
                          phone: '',
                          password: '',
                          cpassword: '',
                          registerAs: 'normal',
                          term: false,
                        })
          console.log('User registered successfully');
          setError(null);

          // Switch to the login form after successful signup
          handleFormSwitch('login');
        })
        .catch((error) => {
          // Handle registration error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(error.response.data.message || 'Registration failed');
          } else if (error.request) {
            // The request was made but no response was received
            setError('No response from the server');
          } else {
            // Something happened in setting up the request that triggered an Error
            setError('An error occurred while processing your request');
          }
        });
    } else {
      setError('Please fill out all required fields and accept the terms');
    }
  };




  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button
              variant={activeForm === 'login' ? 'primary' : 'outline-primary'}
              className="me-2"
              onClick={() => handleFormSwitch('login')}
            >
              Sign In
            </Button>
            <Button
              variant={activeForm === 'signup' ? 'primary' : 'outline-primary'}
              onClick={() => handleFormSwitch('signup')}
            >
              Sign Up
            </Button>
            {activeForm === 'login' && <h2>Sign in to your account</h2>}
            {activeForm === 'signup' && <h2>Create an account</h2>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {activeForm === 'login' && (
          <Form onSubmit={handleLoginSubmit}>
            {/* Sign In Form Fields */}
            <Form.Group className="mb-3" controlId="loginEmailid">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email Id"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                style={formControlStyles}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                style={formControlStyles}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Form.Group className="mb-3" controlId="remember-me">
              <Form.Check
                type="checkbox"
                label="Remember me"
                name="remember"
                id="remember-me"
              />
            </Form.Group>
            <div className="st-flex space-between st-icheck">
              <div>
                <Link to="#" className="st-link open-loss-password" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#st-forgot-form">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </Form>
        )}
        {activeForm === 'signup' && (
          <Form onSubmit={handleSignupSubmit}>
            {/* Signup form fields */}
            <Form.Group className="mb-3" controlId="signupUsername">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="fname"
                value={signupForm.fname}
                onChange={handleSignupChange}
                style={formControlStyles}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupFullname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lname"
                value={signupForm.lname}
                onChange={handleSignupChange}
                style={formControlStyles}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={signupForm.email}
                onChange={handleSignupChange}
                style={formControlStyles}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={signupForm.phone}
                onChange={handleSignupChange}
                style={formControlStyles}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={signupForm.password}
                onChange={handleSignupChange}
                style={formControlStyles}
              />
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupCPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                value={signupForm.cpassword}
                onChange={handleSignupChange}
                style={formControlStyles}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupUserType">
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
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Form.Group className="mb-3" controlId="signupTerm">
              <Form.Check
                type="checkbox"
                id="term"
                name="term"
                className="mr-2"
                label={
                  <>
                    I confirm that I have read and accepted the{' '}
                    <a className="st-link" href="https://modmixmap.travelerwp.com/privacy-policy/">
                      privacy policy
                    </a>
                  </>
                }
                checked={signupForm.term}
                onChange={handleSignupChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  
    </>
  );
};

export default LoginSignupModal;
