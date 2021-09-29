import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSpotifyAuthStatus, getSpotifyAuthURL } from '../../actions/spotify'
import PropTypes from 'prop-types'
import axios from 'axios'

class SpotifyHome extends Component {
    static propTypes = {
        isSpotifyAuthenticated: PropTypes.bool.isRequired,
        getSpotifyAuthStatus: PropTypes.func.isRequired,
        getSpotifyAuthURL: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
    }

    // componentDidUpdate(prevProps) {
    //     if ((this.props.url !== prevProps.url) && (this.props.url !== '') && (!this.props.isSpotifyAuthenticated)) {
    //         window.location.replace(this.props.url)
    //     } else {
    //         console.log('you are spotify authenticated!!!')
    //     }
    // }
    //
    // authSpotify() {
    //     this.props.getSpotifyAuthStatus()
    //     if (!this.props.isSpotifyAuthenticated) {
    //         this.props.getSpotifyAuthURL()
    //     }
    // }
    //
    // componentDidMount() {
    //     this.authSpotify()
    // }

    componentDidMount() {
        this.props.getSpotifyAuthStatus()
    }

    render() {

        console.log(`spotify auth: ${this.props.isSpotifyAuthenticated}`)
        if (!this.props.loading) {
            if (!this.props.isSpotifyAuthenticated) {
                this.props.getSpotifyAuthURL()
                if (this.props.url !== '') {
                    window.location.replace(this.props.url)
                }
            }
        }

        return (
            this.props.isSpotifyAuthenticated ?
                <p>authenticated</p> :
                <p>not authenticated</p>
        )
    }
}

const mapStateToProps = state => ({
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
    url: state.spotify.url,
    loading: state.spotify.loading,
})

export default connect(
    mapStateToProps, { getSpotifyAuthStatus, getSpotifyAuthURL }
)(SpotifyHome)