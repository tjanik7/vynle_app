import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, auth }) => {
    return auth.isAuthenticated ? <>{children}</> : <Navigate to={'/login'}/>
};

const mapStateToProps = state => ({
    auth: state.auth, // Allows for access of the auth object via this.props.auth
});

export default connect(mapStateToProps)(PrivateRoute);