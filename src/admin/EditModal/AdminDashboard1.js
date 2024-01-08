import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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


const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index, event) => {
    event.stopPropagation();
    setActiveItem(activeItem);
  };

  // const navigate = useNavigate();
  const logOut = () => {
     sessionStorage.clear();

    window.localStorage.clear();


  // https://stackoverflow.com/questions/71504920/how-do-i-implement-a-logout-functionality-from-a-react-router-link-to-imports-an

  // https://stackoverflow.com/questions/71960194/update-navbar-after-success-login-or-logout-redirection


  // https://www.bezkoder.com/react-hooks-redux-login-registration-example/

    // localStorage.removeItem('user');
    // location.href = 'localhost:3000';

    window.location.href = "/adminLogin";
    // navigate('/');
  }

  const toggleDropdown = (event, index) => {
    event.stopPropagation();
    setActiveItem(activeItem === index ? null : index);
  };

  
  const closeDropdowns = () => {
    setActiveItem(null);
  };

  document.addEventListener('click', closeDropdowns);

// useEffect(() => {
//     document.addEventListener('click', closeDropdowns);
//     return () => {
//       document.removeEventListener('click', closeDropdowns);
//     };
//   }, []);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <nav className="pb-4 adminNav">
            <div id="mySidebar">
              <div className="nalika-profile">
                <div className="profile-dtl">
                  <Link to="#">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar2.png"
                      alt=""
                      className="img-fluid rounded-circle mb-3"
                    />
                  </Link>
                  <h2>Lakian <span className="min-dtn">Das</span></h2>
                </div>
              </div>

              <ul className="main_dropdown">
                {Array.from({ length: 4 }, (_, index) => (
                  <li key={index} className={activeItem === index ? 'active' : ''}>
                    <Link to="#" onClick={(event) => toggleDropdown(event, index)}>
                      {index === 0 ? 'Admin Info' : index === 1 ? 'Category Info' : index === 2 ? 'Users Info' : 'Booking Info'}
                      <i className={`fas fa-angle-up ${activeItem === index ? 'rotate-up' : ''}`}></i>
                    </Link>
                    {activeItem === index && (
                      <ul className="menu-dropdown">
                        {Array.from({ length: 3 }, (_, subIndex) => (
                          <li key={subIndex} className="menu-item">
                            <Link className="" to="#" onClick={(event) => handleItemClick(subIndex, event)}>
                              {index === 0 ? 'About' : index === 1 ? 'Services' : index === 2 ? 'Clients' : 'Contact'} {subIndex + 1}
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
            </div>
          </nav>
        </div>

        <div className="col-md-10">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-4">
                <div className="card"style={cardStyles}>
                  <div className="card-body text-center">
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img
                      src="https://www.w3schools.com/howto/img_avatar2.png"
                      alt=""
                      className="img-fluid rounded-circle mb-3"
                      style={{ width: '150px', height: '150px' }}
                    />
                    <h5 className="card-title">Lakian Das</h5>
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
                        <strong>Email:</strong> admin@example.com
                      </li>
                      <li className="list-group-item">
                        <strong>Phone:</strong> +1234567890
                      </li>
                      <li className="list-group-item">
                        <strong>Address:</strong> 123 Admin Street, City
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


// Proper Code


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const AdminDashboard = () => {
  const [activeItems, setActiveItems] = useState([]);

  const handleItemClick = (index, event) => {
    event.stopPropagation();
    setActiveItems(activeItems);
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

  const closeDropdowns = () => {
    setActiveItems([]);
  };

  document.addEventListener('click', closeDropdowns);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <nav className="pb-4 adminNav">
            <div id="mySidebar">
              <div className="nalika-profile">
                <div className="profile-dtl">
                  <Link to="#">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar2.png"
                      alt=""
                      className="img-fluid rounded-circle mb-3"
                    />
                  </Link>
                  <h2>Lakian <span className="min-dtn">Das</span></h2>
                </div>
              </div>

              <ul className="main_dropdown">
                {Array.from({ length: 4 }, (_, index) => (
                  <li key={index} className={activeItems.includes(index) ? 'active' : ''}>
                    <Link to="#" onClick={(event) => toggleDropdown(event, index)}>
                      {index === 0 ? 'Admin Info' : index === 1 ? 'Category Info' : index === 2 ? 'Users Info' : 'Booking Info'}
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
                                Add Admin Data
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(2, event)}>
                                View Admin Data
                              </Link>
                            </li>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(3, event)}>
                                Hotels
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(4, event)}>
                                Tours
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(5, event)}>
                                Rentals
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(6, event)}>
                                Cars
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(7, event)}>
                                Activities
                              </Link>
                            </li>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(8, event)}>
                                User Profile
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(9, event)}>
                                Add User Data
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(10, event)}>
                                View Users Data
                              </Link>
                            </li>
                          </>
                        )}
                        {index === 3 && (
                          <>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(11, event)}>
                                Add Booking Data
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#" onClick={(event) => handleItemClick(12, event)}>
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
          <div className="container mt-5">
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
                    <h5 className="card-title">Lakian Das</h5>
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
                        <strong>Email:</strong> admin@example.com
                      </li>
                      <li className="list-group-item">
                        <strong>Phone:</strong> +1234567890
                      </li>
                      <li className="list-group-item">
                        <strong>Address:</strong> 123 Admin Street, City
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
