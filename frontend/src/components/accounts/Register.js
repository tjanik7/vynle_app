import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/auth'
import { clearErrors, createError } from '../../actions/errors'
import { getFieldHasErrorObj } from '../helperFunctions'

class Register extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        re_password: '',
        first: '',
        last: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        errors: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        createError: PropTypes.func.isRequired,
    }

    componentWillUnmount() { // clears errors when user navigates away from this component
        this.props.clearErrors()
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value,
    })

    onSubmit = e => {
        e.preventDefault()
        const { email, username, password, re_password, first, last } = this.state
        if (password !== re_password) {
            const err = {
                msg: {
                    're_password': 'Passwords do not match. Please try again.'
                },
                status: 400,
            }
            this.props.createError(err)
        } else {
            const newUser = {
                email,
                password,
                username,
                first,
                last
            }
            this.props.register(newUser)
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate to={'/'}/>
        }
        const { email, username, password, re_password, first, last } = this.state
        const fields = ['email', 'username', 'first', 'last', 'password', 're_password']
        const errors = this.props.errors
        const fieldHasError = getFieldHasErrorObj(fields, errors)
        let currField

        currField = 'email'
        const emailField = (
            <div className={'form-group mb-3' + (fieldHasError[currField] ? ' has-danger' : '')}>
                <label>Email</label>
                <input
                    type="email"
                    className={'form-control' + (fieldHasError[currField] ? ' is-invalid' : '')}
                    name="email"
                    onChange={this.onChange}
                    value={email}
                />
                {fieldHasError[currField] ? (
                    <div className={'invalid-feedback'}>{errors.msg.email}</div>
                ) : null}
            </div>
        )

        currField = 'username'
        const usernameField = (
            <div className={'form-group mb-3' + (fieldHasError[currField] ? ' has-danger' : '')}>
                <label>Username</label>
                <input
                    type="text"
                    className={'form-control' + (fieldHasError[currField] ? ' is-invalid' : '')}
                    name="username"
                    onChange={this.onChange}
                    value={username}
                />
                {fieldHasError[currField] ? (
                    <div className={'invalid-feedback'}>{errors.msg.username}</div>
                ) : null}
            </div>
        )

        currField = 'first'
        const firstField = (
            <div className={'form-group mb-3' + (fieldHasError[currField] ? ' has-danger' : '')}>
                <label>First Name</label>
                <input
                    type="text"
                    className={'form-control' + (fieldHasError[currField] ? ' is-invalid' : '')}
                    name="first"
                    onChange={this.onChange}
                    value={first}
                />
                {fieldHasError[currField] ? (
                    <div className={'invalid-feedback'}>{errors.msg.first}</div>
                ) : null}
            </div>
        )

        currField = 'last'
        const lastField = (
            <div className={'form-group mb-3' + (fieldHasError[currField] ? ' has-danger' : '')}>
                <label>Last Name</label>
                <input
                    type="text"
                    className={'form-control' + (fieldHasError[currField] ? ' is-invalid' : '')}
                    name="last"
                    onChange={this.onChange}
                    value={last}
                />
                {fieldHasError[currField] ? (
                    <div className={'invalid-feedback'}>{errors.msg.last}</div>
                ) : null}
            </div>
        )

        currField = 'password'
        const passwordField = (
            <div className={'form-group mb-3' + (fieldHasError[currField] ? ' has-danger' : '')}>
                <label>Password</label>
                <input
                    type="password"
                    className={'form-control' + (fieldHasError[currField] ? ' is-invalid' : '')}
                    name="password"
                    onChange={this.onChange}
                    value={password}
                />
                {fieldHasError[currField] ? (
                    <div className={'invalid-feedback'}>{errors.msg.password}</div>
                ) : null}
            </div>
        )

        currField = 're_password'
        const re_passwordField = ( // figure out how to create new err if pwds don't match
            <div className={'form-group mb-3' + (fieldHasError[currField] ? ' has-danger' : '')}>
                <label>Confirm Password</label>
                <input
                    type="password"
                    className={'form-control' + (fieldHasError[currField] ? ' is-invalid' : '')}
                    name="re_password"
                    onChange={this.onChange}
                    value={re_password}
                />
                {fieldHasError[currField] ? (
                    <div className={'invalid-feedback'}>{errors.msg.re_password}</div>
                ) : null}
            </div>
        )

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        {emailField}
                        {usernameField}
                        {firstField}
                        {lastField}
                        {passwordField}
                        {re_passwordField}
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mb-2">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.errors,
})

export default connect(mapStateToProps, { register, clearErrors, createError })(Register)
