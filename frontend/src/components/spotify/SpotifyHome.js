import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSpotifyAuthStatus } from '../../actions/spotify'
import PropTypes from 'prop-types'
import axios from 'axios'

class SpotifyHome extends Component {
    static propTypes = {
        isSpotifyAuthenticated: PropTypes.bool.isRequired,
        getSpotifyAuthStatus: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getSpotifyAuthStatus()
        if (!this.props.isSpotifyAuthenticated) {
            axios.get('/spotify/get-auth-url')
                .then(res => {
                    window.location.replace(res.data.url)
                })
        }
    }

    render() {
        console.log(`isSpotifyAuthenticated: ${this.props.isSpotifyAuthenticated}`)
        return (
            this.props.isSpotifyAuthenticated ?
                <p>authenticated</p> :
                <p>not authenticated</p>
        )
    }
}

const mapStateToProps = state => ({
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
})

export default connect(
    mapStateToProps, { getSpotifyAuthStatus }
)(SpotifyHome)