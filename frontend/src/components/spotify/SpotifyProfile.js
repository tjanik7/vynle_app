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
        isSearchVisible: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        this.props.getCurrentUserSpotifyProfile()
    }

    render() {
        return (
            <div>
                <p>Your Spotify username is {this.props.id}</p>
                <CoverArt albumID={'5ll74bqtkcXlKE7wwkMq4g'} ind={0}/>
                <CoverArt albumID={'4PWBTB6NYSKQwfo79I3prg'} ind={1}/>
                <CoverArt albumID={'5Gm2XKBgnlzd6qTi7LE1z2'} ind={2}/>
                <CoverArt albumID={'7EJ0OT5ZqybXxcYRa6mccM'} ind={3}/>
                <CoverArt albumID={'3Gt7rOjcZQoHCfnKl5AkK7'} ind={4}/>
                <CoverArt albumID={'2WmJ5wp5wKBlIJE6FDAIBJ'} ind={5}/>
                {this.props.isSearchVisible ? <Search/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    id: state.spotify.id,
    isSearchVisible: state.spotifySearch.isVisible,
})

export default connect(mapStateToProps, { getCurrentUserSpotifyProfile })(SpotifyProfile)