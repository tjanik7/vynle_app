import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentUserSpotifyProfile } from '../../actions/spotify'
import { setSearchVisibility, setSelectedIndex } from "../../actions/spotifySearch"
import Search from '../search/Search'
import CoverArt from '../cover_art/CoverArt'
import { Col, Container, Row } from 'react-bootstrap'
import './css/SpotifyProfile.css'
import { setFavAlbum, getFavAlbums } from "../../actions/profile"

class SpotifyProfile extends Component {
    state = {
        searchDisplayed: false, // bool to toggle whether the search tool should be displayed
        albumsLoading: null, // bool to determine whether to show spinner while fav albums are fetched
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        isSearchVisible: PropTypes.bool.isRequired,
    }

    makeSearchVisible = () => {
        this.state.searchDisplayed = true
    }

    componentDidMount() {
        this.props.getCurrentUserSpotifyProfile()
        this.props.getFavAlbums()
    }

    componentWillUnmount() {
        //this.props.setSearchVisibility(false)
        this.state.searchDisplayed = false
    }

    fetchedAllAlbums() { // Returns bool specifying if done loading
        const albums = this.props.favoriteAlbums

        for (const album of albums) {
            if (!album.fetched) {
                return false
            }
        }
        return true
    }

    generateAlbumTags() {
        const rows = []

        for (let i = 0; i < 6; i++) {  // Generates JSX tags for album art
            rows.push(
                <Col key={i}>
                    <CoverArt
                        albumData={this.props.favoriteAlbums[i]}
                        handleClick={() => {
                            this.props.setSelectedIndex(i)
                            this.makeSearchVisible()
                        }}
                    />
                </Col>
            )
        }
        return rows
    }

    render() {
        return (
            <Fragment>
                {!this.fetchedAllAlbums() && <div className={'spinner-layer'}>
                    <div className={'text-container'}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>}
                <div>
                    <p>Authenticated with Spotify as {this.props.id}</p>
                    <Container>
                        <Row xs={6}>
                            {this.generateAlbumTags()}
                        </Row>
                    </Container>
                    {this.state.searchDisplayed && <Search
                        clickFunction={this.props.setFavAlbum}
                        clearSearchVisibility={() => {this.state.searchDisplayed = false}}
                        clickFunctionArgs={[this.props.selectedIndex]}
                    />}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    id: state.spotify.id, // User's Spotify username
    isSearchVisible: state.spotifySearch.isVisible,
    selectedIndex: state.spotifySearch.selectedIndex,
    favoriteAlbums: state.profile.favoriteAlbums,
})

export default connect(mapStateToProps, {
    getCurrentUserSpotifyProfile,
    setFavAlbum,
    setSelectedIndex,
    getFavAlbums,
    setSearchVisibility,
})(SpotifyProfile)