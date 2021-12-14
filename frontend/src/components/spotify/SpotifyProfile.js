import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentUserSpotifyProfile } from '../../actions/spotify'
import Search from '../search/Search'
import CoverArt from '../cover_art/CoverArt'

class SpotifyProfile extends Component {
    state = {
        searchDisplayed: false, // bool to toggle whether the search tool should be displayed
    }

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
                <CoverArt albumID={'5ll74bqtkcXlKE7wwkMq4g'} ind={0}/>
                <Search/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    id: state.spotify.id,
})

export default connect(mapStateToProps, { getCurrentUserSpotifyProfile })(SpotifyProfile)