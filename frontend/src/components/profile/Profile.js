import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { getCurrentUserSpotifyProfile } from "../../actions/spotify"
import { followUser, getUserProfile, setFavAlbum, unfollowUser } from "../../actions/profile"
import { setSelectedIndex } from "../../actions/spotifySearch"

import './css/Profile.css'
import { useParams } from "react-router-dom"
import Posts from "../posts/Posts"
import { getUserPosts } from "../../actions/posts"
import FavoriteAlbums from "./FavoriteAlbums"

function fetchedAllAlbums(props) { // Returns bool specifying if done loading
    const albums = props.profile.favoriteAlbums

    for (const album of albums) {
        if (!album.fetched) {
            return false
        }
    }
    return true
}

function Profile(props) {
    const {username} = useParams()  // Vynle username of profile being viewed

    if (props.profileNotFound) {
        return (
            <Fragment>
                <h2>Could not find user "{username}"</h2>
            </Fragment>
        )
    }

    const isProfileOwner = username === props.username // Checks if URL matches logged-in user

    const [posts, setPosts] = useState(null)
    let post_resp_status = 200


    // Fetch Spotify data on render (by username of profile)
    useEffect(() => {
        props.getCurrentUserSpotifyProfile()
        props.getUserProfile(username)

        post_resp_status = getUserPosts(username, setPosts, props.authToken)
    }, [props.id]);

    let followButton = null

    if (!isProfileOwner) {
        if (props.profile.is_following) { // If already following user
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
            <h3 className={'mb-3'}>{username}</h3>
            {followButton}
            <div id={'top-level-container'}>
                <div id={'favorite-albums-container'}>
                    <FavoriteAlbums isProfileOwner={isProfileOwner}/>
                </div>
                {!fetchedAllAlbums(props) && <div className={'spinner-layer'}>
                    <div className={'text-container'}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>}
                <div id={'posts-container'} className={'mt-5'}>
                    <Posts
                        posts={posts}
                        httpStatus={post_resp_status}
                        noPostsMessage={'This user hasn\'t posted yet.'}
                    />
                </div>
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