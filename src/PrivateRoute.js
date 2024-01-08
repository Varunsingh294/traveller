// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;



// App.js
import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Home from './PageComponents/Home';
import Hotel from './PageComponents/Hotel';
import Tour from './PageComponents/Tour';
import Activity from './PageComponents/Activity';
import Rental from './PageComponents/Rental';
import Car from './PageComponents/Car';
import Pages from './PageComponents/Pages';
import AdminInfo from './admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignupModal />} />
          <PrivateRoute path="/hotel" element={<Hotel />} />
          <PrivateRoute path="/tour" element={<Tour />} />
          <PrivateRoute path="/activity" element={<Activity />} />
          <PrivateRoute path="/rental" element={<Rental />} />
          <PrivateRoute path="/car" element={<Car />} />
          <PrivateRoute path="/pages" element={<Pages />} />

          <PrivateRoute path="/admin" element={<AdminInfo />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
