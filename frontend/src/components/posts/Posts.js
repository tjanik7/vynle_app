import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { getPosts, deletePost, resetPostsLoading } from '../../actions/posts'
import Post from './Post'

class Posts extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        getPosts: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
    }

    componentWillUnmount() {
        this.props.resetPostsLoading()
    }

    render() {
        const posts = this.props.posts
        let message = null

        if (!this.props.postsLoading) {
            if(this.props.spotifyUnauthorized) {
                message = <h4>Please link a Spotify account to view posts.</h4>
            } else if(posts.length === 0) {
                message = <h4>No posts to show.</h4>
            }
        }

        return (
            <Container>
                {this.props.postsLoading && <div className={'spinner-layer'}>
                    <div className={'spinner-border'} role={'status'}>
                        <span className={'visually-hidden'}>Loading...</span>
                    </div>
                </div>}
                {message}
                {posts.map(post => (
                    <Row key={post.id} className={'justify-content-md-center'}>
                        <Col md={10}>
                            <Post
                                username={post.user.username}
                                body={post.body}
                                albumData={post.release}
                                postID={post.id}
                                isClickable={true}
                            />
                        </Col>
                    </Row>
                ))}
            </Container>
        )
    }
}

// necessary to connect props being passed in from reducer to the internal react state of this component
// map redux state to the props of this component
const mapStateToProps = state => ({
    postsLoading: state.posts.postsLoading,
    spotifyUnauthorized: state.posts.spotifyUnauthorized,
})

export default connect(
    mapStateToProps,
    { getPosts, deletePost, resetPostsLoading }
)(Posts)
