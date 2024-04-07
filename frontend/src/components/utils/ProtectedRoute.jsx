
import PropTypes from 'prop-types';
import {  Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const token = localStorage.getItem('token');
    const userRoles = localStorage.getItem('role');

    if (!token || !userRoles || !roles.includes(userRoles)) {
      return <Navigate to="/login" replace />;
    }

    return children ? children : null;
  };
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
