import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) { // could return a spinner or some loading animation here
                return <h2>Loading...</h2>;
            } else if (!auth.isAuthenticated) {
                return <Redirect to={'/login'}/>;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth, // allows for access to the auth object via this.props.auth
});

export default connect(mapStateToProps)(PrivateRoute);