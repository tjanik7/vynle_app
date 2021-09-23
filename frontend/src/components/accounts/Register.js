import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/auth'

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
        errors: PropTypes.object.isRequired
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value,
    })

    onSubmit = e => {
        e.preventDefault()
        const { email, username, password, re_password, first, last } = this.state
        if (password !== re_password) {
            console.log('passwords do not match')
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
            return <Redirect to={'/'}/>
        }
        // FIX CODE SO IT DOESN'T EXAMINE THE MSG OBJECT UNTIL IT CHECKS THAT STATUS !== NULL;
        // THEN SET DIVS IN RENDER METHOD ACCORDING TO THE ERRORS
        const { email, username, password, re_password, first, last } = this.state

        const isError = this.props.errors.status !== null
        if (isError) {
            console.log('hii')
            console.log(this.props.errors.msg)
        }

        let usernameGroup // must init before conditional block to avoid error
        // if ('username' in this.props.msg) {
        //     console.log('hi')
        // }
        if (!isError) {
            usernameGroup = <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                />
            </div>
        } else {
            usernameGroup = <div className="form-group has-danger">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control is-invalid"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                />
                <div className={'invalid-feedback'}>username taken idiot</div>
            </div>
        }

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        {usernameGroup}
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first"
                                onChange={this.onChange}
                                value={first}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last"
                                onChange={this.onChange}
                                value={last}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="re_password"
                                onChange={this.onChange}
                                value={re_password}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
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

export default connect(mapStateToProps, { register })(Register)
