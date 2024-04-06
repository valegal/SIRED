
import PropTypes from 'prop-types';
import {  Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const token = localStorage.getItem('token');
    const userRoles = localStorage.getItem('role');
  
    console.log('Token:', token);
    console.log('User Roles:', userRoles);
    console.log('Required Roles:', roles);
  
    if (!token || !userRoles || !roles.includes(userRoles)) {
      console.log('Redirecting to login');
      return <Navigate to="/login" replace />;
    }
  
    console.log('Access granted');
    return children ? children : null;
  };
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
