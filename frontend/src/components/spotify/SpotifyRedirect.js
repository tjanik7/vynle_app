import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSpotifyAuthStatus, getSpotifyAuthURL } from '../../actions/spotify'
import PropTypes from 'prop-types'

class SpotifyRedirect extends Component {
    static propTypes = {
        isSpotifyAuthenticated: PropTypes.bool, // 'isRequired' not included since this value needs to be null by default
        getSpotifyAuthStatus: PropTypes.func.isRequired,
        getSpotifyAuthURL: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
    }

    render() {
        let text = ''
        const isSpotifyAuthenticated = this.props.isSpotifyAuthenticated
        if (isSpotifyAuthenticated != null) {
            if (!isSpotifyAuthenticated) { // not auth
                text = 'Redirecting you to Spotify...'
                this.props.getSpotifyAuthURL()
                if (this.props.url !== '') {
                    window.location.replace(this.props.url)
                }
            } else { // auth - should not be possible to reach this code
                text = 'Something went wrong'
            }
        } else { // Spotify auth status not yet determined
            text = 'Fetching your Spotify profile...'
        }

        return (
            <p>{text}</p>
        )
    }
}

const mapStateToProps = state => ({
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
    url: state.spotify.url,
})

export default connect(
    mapStateToProps, { getSpotifyAuthStatus, getSpotifyAuthURL }
)(SpotifyRedirect)