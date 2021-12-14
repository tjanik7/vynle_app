import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import './css/Header.css'

class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        isSpotifyAuthenticated: PropTypes.bool,
    }

    render() {
        const { isAuthenticated, user } = this.props.auth
        const isSpotifyAuthenticated = this.props.isSpotifyAuthenticated
        let spotifyLink
        if (isSpotifyAuthenticated == null) { // status not yet loaded
            spotifyLink = (
                <Link to={'#'} className={'nav-link disabled'}>Connect with Spotify</Link>
            )
        } else if (isSpotifyAuthenticated) { // authenticated
            spotifyLink = (
                <Link to={'/spotify-profile'} className={'nav-link'}>Spotify Profile</Link>
            )
        } else {
            spotifyLink = ( // user is not spotify authenticated
                <Link to={'/spotify-redirect'} className={'nav-link'}>Connect with Spotify</Link>
            )
        }

        const authLinks = ( // links to show when user is authenticated
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className={'nav-item'}>
                    {spotifyLink}
                </li>
                <li className={'nav-item'}>
                    <span className={'navbar-text nav-link'}>
                        <strong>
                            {user ? `Welcome, ${user.first}` : ''}
                        </strong>
                    </span>
                </li>
                <li className={'nav-item'}>
                    <button onClick={this.props.logout}
                            className={'nav-link btn-primary btn-sm text-light testing-nb'}>Logout
                    </button>
                </li>
            </ul>
        )

        const guestLinks = ( // links to show when not authenticated
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className={'nav-item'}>
                    <Link to={'/register'} className={'nav-link'}>Register</Link>
                </li>
                <li className={'nav-item'}>
                    <Link to={'/login'} className={'nav-link'}>Login</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className={'container'}>
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a className="navbar-brand py-0" href="#">
                                <img id={'logo-main'} src={'/static/logo/logo_main.svg'} alt={'Vynle Logo'}/>
                            </a>
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
})

export default connect(mapStateToProps, { logout })(Header)
