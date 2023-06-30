import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import { clearErrors } from '../../actions/errors'
import { getFieldHasErrorObj } from '../helperFunctions'

class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: null,  // Represents loading status
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        errors: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentWillUnmount() { // clears errors and reset state when user navigates away from this component
        this.setState({
                isLoading: false,
            })
        this.props.clearErrors()
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value,
    })

    onSubmit = e => {
        e.preventDefault() // Prevent default behavior of HTML element
        this.setState({
            isLoading: true,
        })
        this.props.login(this.state.email, this.state.password) // call login action
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate to={'/'}/>
        }
        const { email, password, isLoading } = this.state
        
        const errors = this.props.errors
        const fields = ['email', 'password', 'non_field_errors']
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

        currField = 'non_field_errors'
        const nonFieldErrors = (
            fieldHasError[currField] ?
                <h5 className={'text-danger'}>Incorrect username or password. Please try again.</h5>
                : null
        )

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit}>
                        {nonFieldErrors}
                        {emailField}
                        {passwordField}
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mb-2">
                                {isLoading ? <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"></span>: null}
                                Login
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
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

// always pass mapStateToProps (if necessary) and any actions used into connect
export default connect(mapStateToProps, { login, clearErrors })(Login)