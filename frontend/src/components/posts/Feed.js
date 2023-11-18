// Home page of application when user is authenticated
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import { getSpotifyAuthStatus } from '../../actions/spotify'
import {getPosts} from "../../actions/posts"
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import './css/Feed.css'

class Feed extends Component {
    static propTypes = {
        isSpotifyAuthenticated: PropTypes.bool,
        getSpotifyAuthStatus: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getSpotifyAuthStatus()
        this.props.getPosts()
    }

    render() {
        return (
            <div id={'landing-page-container'}>
                <Link to={'/create-post-form'} className="btn btn-primary my-2">Create a Post</Link>
                <Posts posts={this.props.posts}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
    posts: state.posts.posts,
})

export default connect(mapStateToProps, { getSpotifyAuthStatus, getPosts })(Feed)
