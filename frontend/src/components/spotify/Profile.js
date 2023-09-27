import React, { Fragment, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Search from "../search/Search"
import { connect } from "react-redux"
import { getCurrentUserSpotifyProfile } from "../../actions/spotify"
import { getFavAlbums, setFavAlbum } from "../../actions/profile"
import { setSelectedIndex } from "../../actions/spotifySearch"
import CoverArt from "../cover_art/CoverArt"

function fetchedAllAlbums(props) { // Returns bool specifying if done loading
    const albums = props.favoriteAlbums

    for (const album of albums) {
        if (!album.fetched) {
            return false
        }
    }
    return true
}

function generateAlbumTags(props, setSearchDisplayed) {
    const rows = []

    for (let i = 0; i < 6; i++) {  // Generates JSX tags for album art
        rows.push(
            <Col key={i}>
                <CoverArt
                    albumData={props.favoriteAlbums[i]}
                    handleClick={() => {
                        props.setSelectedIndex(i)
                        setSearchDisplayed(true)
                    }}
                />
            </Col>
        )
    }
    return rows
}

function Profile(props) {
    const [searchDisplayed, setSearchDisplayed] = useState(false)

    useEffect(() => {
        props.getCurrentUserSpotifyProfile()
        props.getFavAlbums()
        return () => {
            setSearchDisplayed(false)
        }
    }, []);

    return (
            <Fragment>
                {!fetchedAllAlbums(props) && <div className={'spinner-layer'}>
                    <div className={'text-container'}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>}
                <div>
                    <p>Authenticated with Spotify as {props.id}</p>
                    <Container>
                        <Row xs={6}>
                            {generateAlbumTags(props, setSearchDisplayed)}
                        </Row>
                    </Container>
                    {searchDisplayed && <Search
                        clickFunction={props.setFavAlbum}
                        clearSearchVisibility={() => {setSearchDisplayed(false)}}
                        clickFunctionArgs={[props.selectedIndex]}
                    />}
                </div>
            </Fragment>
        )
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
})(Profile)