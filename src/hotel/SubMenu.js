import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const menuItems = [
  { label: 'Hotel Info', submenu: ['Hotel Profile', 'Update Hotel Data'] },
  { label: 'Users Info', submenu: ['Add User Data', 'View Users Data'] },
  {
    label: 'Category Info',
    submenu: [
      { label: 'Hotels', submenu: ['Add Hotel', 'View Hotel'] },
      { label: 'Tours', submenu: ['Add Tours', 'View Tours'] },
      { label: 'Rentals', submenu: ['Add Rentals', 'View Rentals'] },
      { label: 'Cars', submenu: ['Add Cars', 'View Cars'] },
      { label: 'Activities', submenu: ['Add Activities', 'View Activities'] },
    ],
  },
  { label: 'Booking Info', submenu: ['Add Booking Data', 'View Booking Data'] },
];

const MainComponent = () => {
  const [activeTab, setActiveTab] = useState([]);
  const [activeItems, setActiveItems] = useState(0);
  const [openSubmenus, setOpenSubmenus] = useState([]);
  const [editFormData, setEditFormData] = useState(null);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [roomDetailsToEdit, setRoomDetailsToEdit] = useState(null);

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

  const renderSubMenu = (submenu, parentIndex) => (
    <ul className="submenu">
      {submenu.map((item, subIndex) => (
        <li key={subIndex} className="submenu-item">
          <Link to="#" onClick={(event) => handleItemClick(parentIndex + subIndex + 1, event)}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderMenu = () => (
    <ul className="main_dropdown">
      {menuItems.map((item, index) => (
        <li key={index} className={activeTab.includes(index) ? 'active' : ''}>
          <Link to="#" onClick={(event) => toggleDropdown(event, index)}>
            {item.label}
            <i className={`fas fa-angle-up ${activeTab.includes(index) ? 'rotate-up' : ''}`}></i>
          </Link>
          {activeTab.includes(index) && item.submenu && renderSubMenu(item.submenu, index)}
        </li>
      ))}
      <li style={{ marginTop: '30px' }}>
        <Link to="#" className="logout-btn" onClick={logOut}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const componentMapping = {
    0: hotelProfile,
    1: <HotelRegistration />,
    2: <HotelViewData />,
    3: <RoomViewData />,
    4: RenderRoomsForm,
    5: RenderRoomDetailsForm,
    6: RoomDetailViewData,
    // Add more mappings as needed
  };

  const renderActiveComponent = () => {
    if (editFormData) {
      return <RenderEditForm />;
    } else if (roomToEdit) {
      return RoomUpdateForm;
    } else if (roomDetailsToEdit) {
      return RenderRoomDetailsUpdateForm;
    }

    return componentMapping[activeItems] || null;
  };

  return (
    <div>
      {renderMenu()}
      {renderActiveComponent()}
    </div>
  );
};

export default MainComponent;
