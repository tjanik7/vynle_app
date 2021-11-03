import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentUserSpotifyProfile } from '../../actions/spotify'
import Search from '../search/Search'

class SpotifyProfile extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this.props.getCurrentUserSpotifyProfile()
    }

    render() {
        return (
            <div>
                <p>Your Spotify username is {this.props.id}</p>
                <Search/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    id: state.spotify.id,
})

export default connect(mapStateToProps, { getCurrentUserSpotifyProfile })(SpotifyProfile)