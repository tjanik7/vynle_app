import React, { Fragment, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Search from "../search/Search"
import { connect } from "react-redux"
import { getCurrentUserSpotifyProfile } from "../../actions/spotify"
import { followUser, getUserProfile, setFavAlbum, unfollowUser } from "../../actions/profile"
import { setSelectedIndex } from "../../actions/spotifySearch"
import CoverArt from "../cover_art/CoverArt"

import './css/Profile.css'
import { useParams } from "react-router-dom"
import Posts from "../posts/Posts"
import { getUserPosts } from "../../actions/posts"

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

    if(props.profileNotFound) {
        return (
            <Fragment>
                <h2>Could not find user "{username}"</h2>
            </Fragment>
        )
    }

    const isProfileOwner = username === props.username // Checks if URL matches logged-in user

    const [searchDisplayed, setSearchDisplayed] = useState(false)
    const [posts, setPosts] = useState(null)
    let post_resp_status = 200


    // Fetch Spotify data on render (by username of profile)
    useEffect(() => {
        props.getCurrentUserSpotifyProfile()
        props.getUserProfile(username)

        post_resp_status = getUserPosts(username, setPosts, props.authToken)

        return () => {
            setSearchDisplayed(false)
        }
    }, [props.id]);

    let followButton = null

    if(!isProfileOwner) {
        if(props.profile.is_following) { // If already following user
            followButton = <button
                type={'button'}
                onClick={() => {
                    props.unfollowUser(props.profile.user_id)
                }}
                className={'btn btn-secondary m-3'}>Following</button>
        } else { // If not following
            followButton = <button
                type={'button'}
                onClick={() => {
                    props.followUser(props.profile.user_id)
                }}
                className={'btn btn-primary m-3'}>Follow</button>
        }
    }

    return (
            <Fragment>
                <h3>{username}</h3>
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
                <div className={'mt-5'}>
                    <Posts
                        posts={posts}
                        httpStatus={post_resp_status}
                        noPostsMessage={'This user hasn\'t posted yet.'}
                    />
                </div>
            </Fragment>
        )
}

const mapStateToProps = state => ({
    id: state.spotify.id,
    authToken: state.auth.token,
    isSearchVisible: state.spotifySearch.isVisible,
    selectedIndex: state.spotifySearch.selectedIndex,
    profile: state.profile,
    username: state.auth.user.username,
    profileNotFound: state.profile.not_found,
})

export default connect(mapStateToProps, {
    getCurrentUserSpotifyProfile,
    setFavAlbum,
    setSelectedIndex,
    getUserProfile,
    followUser,
    unfollowUser,
})(Profile)