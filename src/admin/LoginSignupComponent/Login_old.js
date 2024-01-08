import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginSignup.css';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (loginForm.email && loginForm.password) {
      try {
        const response = await axios.post('http://localhost/traveler/admin_login_api.php', {
          email: loginForm.email,
          password: loginForm.password,
        });

        if (response.data.success) {
          setLoginForm({
            email: '',
            password: '',
          });

          // Extract the token and session data from the response
          const { token, sessionData, admin_id } = response.data;

          // Store the token, session data, and admin ID in localStorage
          window.localStorage.setItem("token-info", JSON.stringify({ token }));
          window.sessionStorage.setItem("session-data", JSON.stringify(sessionData));
          window.localStorage.setItem("adminId", JSON.stringify(admin_id));
          window.localStorage.setItem("adminloggedIn", true);

          // Fetch and store admin data from admin_single_data.php
          try {
            const adminDataResponse = await axios.post(
              'http://localhost/traveler/admin_single_data.php',
              { admin_id : admin_id },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // console.log(adminDataResponse.status);
            // console.log(adminDataResponse.data);
            if (adminDataResponse.status) {
              // Store admin data in localStorage
              window.localStorage.setItem("adminData", JSON.stringify(adminDataResponse.data[0]));
            } else {
              console.error('Failed to fetch admin data:', adminDataResponse.data.message);
            }
          } catch (error) {
            console.error('Error fetching admin data:', error);
          }

          // Authentication successful, handle the logged-in user
          console.log('Admin logged in successfully');
          // Optionally, you can redirect the user or perform other actions
          setError(null);
          navigate('/admin');
          // window.location.href = "/admin";
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

  return (
    <div className="body">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleLoginSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                className="form-control custom-input"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className="form-control custom-input"
                placeholder="Enter password"
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <p className="forgot-password text-right">
              Forgot <Link to="#">password?</Link> 
              <span> or </span>
              <Link to="/adminSignup">sign up?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


//////



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginSignup.css';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token-info');
      const adminId = localStorage.getItem('adminId');

      if (token && adminId) {
        try {
          const adminDataResponse = await axios.post(
            'http://localhost/traveler/admin_single_data.php',
            { admin_id: adminId },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(token).token}`,
              },
            }
          );

          if (adminDataResponse.status === 200) {
            localStorage.setItem('adminData', JSON.stringify(adminDataResponse.data[0]));
          } else {
            console.error('Failed to fetch admin data:', adminDataResponse.data.message);
          }
        } catch (error) {
          console.error('Error fetching admin data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  if (loginForm.email && loginForm.password) {
    let adminDataResponse; // Declare adminDataResponse outside the try block

    try {
      const response = await axios.post('http://localhost/traveler/admin_login_api.php', {
        email: loginForm.email,
        password: loginForm.password,
      });

      if (response.data.success) {
        setLoginForm({
          email: '',
          password: '',
        });

        const { token, sessionData, admin_id } = response.data;

        localStorage.setItem('token-info', JSON.stringify({ token }));
        localStorage.setItem('session-data', JSON.stringify(sessionData));
        localStorage.setItem('adminId', JSON.stringify(admin_id));
        localStorage.setItem('adminloggedIn', true);

        // Fetch admin data after successful login
        adminDataResponse = await axios.post(
          'http://localhost/traveler/admin_single_data.php',
          { admin_id: admin_id },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (adminDataResponse.status === 200) {
          localStorage.setItem('adminData', JSON.stringify(adminDataResponse.data[0]));
        } else {
          console.error('Failed to fetch admin data:', adminDataResponse.data.message);
        }

        // Navigate to "/admin" after storing admin data
        navigate('/admin');

        setError(null);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred while processing your login request');
    }
  } else {
    setError('Please enter valid login credentials');
  }
};


  return (
    <div className="body">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleLoginSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                className="form-control custom-input"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className="form-control custom-input"
                placeholder="Enter password"
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <p className="forgot-password text-right">
              Forgot <Link to="#">password?</Link>
              <span> or </span>
              <Link to="/adminSignup">sign up?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
