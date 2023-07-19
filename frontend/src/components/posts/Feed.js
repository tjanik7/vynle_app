// Home page of application when user is authenticated
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import { getSpotifyAuthStatus } from '../../actions/spotify'
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
    }

    render() {
        return (
            <div id={'landing-page-container'}>
                <Link to={'/create-post-form'} className="btn btn-primary my-2">Create a Post</Link>
                <Posts/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
})

export default connect(mapStateToProps, { getSpotifyAuthStatus })(Feed)
