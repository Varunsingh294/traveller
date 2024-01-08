import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './PageComponents/Home';
import Hotel from './PageComponents/Hotel';
import Tour from './PageComponents/Tour';
import Activity from './PageComponents/Activity';
import Rental from './PageComponents/Rental';
import Car from './PageComponents/Car';
import Pages from './PageComponents/Pages';
import BillSummary from './BillSummary/BillSummary.js';
import AdminInfo from './admin/AdminDashboard';
import Login from './admin/LoginSignupComponent/Login';
import Signup from './admin/LoginSignupComponent/Signup';

import HotelInfo from './hotel/HotelDashboard';
import HotelLogin from './hotel/LoginSignupComponent/HotelLogin.js';
import HotelSignUp from './hotel/LoginSignupComponent/HotelSignUp.js';

import HotelRooms from './HotelRooms/HotelRooms';
import HotelRoomDepartments from './HotelRooms/HotelRoomDepartments';
import Checkout from './HotelRooms/Checkout';

import AddToCartProvider from './contexts/AddToCartProvider';

function App() {

  const isAdminLoggedIn = window.localStorage.getItem('adminloggedIn');
  
  // const isAdminLoggedIn = window.localStorage.getItem('loggedIn');

  const isHotelLoggedIn = window.localStorage.getItem('hotelLoggedIn');

  return (
    <>
      <AddToCartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/hotel"
              element={isAdminLoggedIn ? <Hotel /> : <Navigate to="/" />}
            />
            <Route
              path="/tour"
              element={isAdminLoggedIn ? <Tour /> : <Navigate to="/" />}
            />
            <Route
              path="/activity"
              element={isAdminLoggedIn ? <Activity /> : <Navigate to="/" />}
            />
            <Route
              path="/rental"
              element={isAdminLoggedIn ? <Rental /> : <Navigate to="/" />}
            />
            <Route
              path="/car"
              element={isAdminLoggedIn ? <Car /> : <Navigate to="/" />}
            />
            <Route
              path="/pages"
              element={isAdminLoggedIn ? <Pages /> : <Navigate to="/" />}
            />

            <Route
              path="/admin"
              element={isAdminLoggedIn ? <AdminInfo /> : <Navigate to="/adminLogin" />}
            />

            <Route
              path="/hotelDashboard"
              element={isHotelLoggedIn ? <HotelInfo /> : <Navigate to="/hotelLogin" />}
            />
            
            <Route
              path="/hotelRooms/:hotelId"
              element={isAdminLoggedIn ? <HotelRooms /> : <Navigate to="/" />}
            />

            <Route
              path="/hotelRoomDepartments/:roomId"
              element={isAdminLoggedIn ? <HotelRoomDepartments /> : <Navigate to="/" />}
            />
            <Route
              path="/checkout"
              element={isAdminLoggedIn ? <Checkout /> : <Navigate to="/" />}
            />

            <Route path="/billSummary" element={<BillSummary />} />

            <Route path="/adminLogin" element={<Login />} />
            <Route path="/adminSignup" element={<Signup />} />

            <Route path="/hotelLogin" element={<HotelLogin />} />
            <Route path="/hotelSignup" element={<HotelSignUp />} />
          </Routes>
        </BrowserRouter>
      </AddToCartProvider>
    </>
  );
}

export default App;
