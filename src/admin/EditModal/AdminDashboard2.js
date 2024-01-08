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
  const [selectedContent, setSelectedContent] = useState(null);

  const handleItemClick = (index, event) => {
    event.stopPropagation();
    setActiveItems((prevActiveItems) => {
      const isActive = prevActiveItems.includes(index);
      if (isActive) {
        // Close the dropdown
        setSelectedContent(null);
        return prevActiveItems.filter((item) => item !== index);
      } else {
        // Open the dropdown
        setSelectedContent(index);
        return [...prevActiveItems, index];
      }
    });
  };

  const logOut = () => {
    sessionStorage.clear();
    window.localStorage.clear();
    window.location.href = "/adminLogin";
  };

  const renderDynamicContent = () => {
    // Render different content based on the selected dropdown
    switch (selectedContent) {
      case 0:
        return (
          <div className="col-md-8">
            admin
          </div>
        );
      case 1:
        return (
          <div className="col-md-8">
            Category
          </div>
        );
      case 2:
        return (
          <div className="col-md-8">
            Users
          </div>
        );
        case 3:
        return (
          <div className="col-md-8">
            Booking
          </div>
        );
      // Add cases for other dropdown items as needed
      default:
        return null;
    }
  };

const closeDropdowns = () => {
    setActiveItems([]);
    setSelectedContent(null);
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
                    <Link to="#" onClick={(event) => handleItemClick(index, event)}>
                      {index === 0 ? 'Admin Info' : index === 1 ? 'Category Info' : index === 2 ? 'Users Info' : 'Booking Info'}
                      <i className={`fas fa-angle-up ${activeItems.includes(index) ? 'rotate-up' : ''}`}></i>
                    </Link>
                    {activeItems.includes(index) && (
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

        {renderDynamicContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
