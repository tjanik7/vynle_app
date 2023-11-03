import React, { Fragment, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Search from "../search/Search"
import { connect } from "react-redux"
import { getCurrentUserSpotifyProfile } from "../../actions/spotify"
import { getUserProfile, setFavAlbum } from "../../actions/profile"
import { setSelectedIndex } from "../../actions/spotifySearch"
import CoverArt from "../cover_art/CoverArt"

import './css/Profile.css'
import { useParams } from "react-router-dom"

function fetchedAllAlbums(props) { // Returns bool specifying if done loading
    const albums = props.profile.favoriteAlbums

    for (const album of albums) {
        if (!album.fetched) {
            return false
        }
    }
    return true
}

function generateAlbumTags(props, setSearchDisplayed, isClickable) {
    const rows = []

    for (let i = 0; i < 6; i++) {  // Generates JSX tags for album art
        rows.push(
            <Col key={i}>
                <CoverArt
                    albumData={props.profile.favoriteAlbums[i]}
                    isClickable={isClickable}
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
    const {username} = useParams()  // Vynle username of profile being viewed
    const isProfileOwner = username === props.username // Checks if URL matches logged-in user

    const [searchDisplayed, setSearchDisplayed] = useState(false)


    // Fetch Spotify data on render (by username of profile)
    useEffect(() => {
        props.getCurrentUserSpotifyProfile()
        props.getUserProfile(username)

        return () => {
            setSearchDisplayed(false)
        }
    }, [props.id]);

    const followButton = !isProfileOwner ?
                        <button type={'button'}
                                className={'btn btn-'  + (props.profile.is_following ? 'secondary' : 'primary') + ' m-3'}>
                            {props.profile.is_following ? 'Following' : 'Follow'}
                        </button>
                        : null

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
                    {followButton}
                    <Container>
                        <Row xs={6}>
                            {generateAlbumTags(props, setSearchDisplayed, isProfileOwner)}
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
    id: state.spotify.id,
    isSearchVisible: state.spotifySearch.isVisible,
    selectedIndex: state.spotifySearch.selectedIndex,
    profile: state.profile,
    username: state.auth.user.username,
})

export default connect(mapStateToProps, {
    getCurrentUserSpotifyProfile,
    setFavAlbum,
    setSelectedIndex,
    getUserProfile,
})(Profile)