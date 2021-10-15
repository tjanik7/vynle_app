import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

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
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className={'nav-item'}>
                    {spotifyLink}
                </li>
                <span className={'navbar-text mr-3'}>
                    <strong>
                        {user ? `Welcome, ${user.first}` : ''}
                    </strong>
                </span>
                <li className={'nav-item'}>
                    <button onClick={this.props.logout} className={'nav-link btn-info btn-sm text-light'}>Logout
                    </button>
                </li>
            </ul>
        )

        const guestLinks = ( // links to show when not authenticated
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
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
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo01"
                            aria-controls="navbarTogglerDemo01"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a className="navbar-brand" href="#">
                                Vynle
                            </a>
                        </div>
                        {isAuthenticated ? authLinks : guestLinks}
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
