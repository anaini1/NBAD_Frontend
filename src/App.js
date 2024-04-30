// Proj.js
import React, { useEffect } from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';


import DashboardPage from './DashboardPage';
import LoginPage from './LoginPage';
import Home from './Home';
import SignupPage from './SignupPage';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';
import { AuthProvider, useAuth } from './AuthProvider';
import ModifyCategory from './ModifyCategory'
const PrivateRoute = ({ element, ...rest }) => {
  const { authenticated } = useAuth();
  if (authenticated === null) {
    return null;
  }

  if (authenticated) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const { authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
   
  }, [authenticated]);

  return (
    <Router>
      <div className="mainContainer">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
           <Route path="/addcategory" element={<PrivateRoute element={<AddCategory />} />} />
           {/* <Route path="/addcategory" element={<AddCategory />} /> */}
           <Route path="/modifycategory" element={<PrivateRoute element={<ModifyCategory />} />} />
           <Route path="/deletecategory" element={<PrivateRoute element={<DeleteCategory />} />} />
          {/* <Route path="/deletecategory" element={<DeleteCategory />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

