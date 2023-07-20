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

    componentDidMount() {
        this.props.getPosts()
    }

    componentWillUnmount() {
        this.props.resetPostsLoading()
    }

    render() {
        return (
            <Container>
                {this.props.postsLoading && <div className={'spinner-layer'}>
                    <div className={'spinner-border'} role={'status'}>
                        <span className={'visually-hidden'}>Loading...</span>
                    </div>
                </div>}
                {!this.props.postsLoading && this.props.posts.length === 0 && <h4>No posts to show</h4>}
                {this.props.posts.map(post => (
                    <Row key={post.id} className={'justify-content-md-center'}>
                        <Col md={10}>
                            <Post
                                username={post.user.username}
                                body={post.body}
                                albumData={post.album_data}
                                postID={post.id}
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
    posts: state.posts.posts, // storing the attribute 'posts' from the posts reducer
    // of the redux state in this.props.posts
    // the name of the prop we want to store this in is specified on the LHS of this line
})

export default connect(
    mapStateToProps,
    { getPosts, deletePost, resetPostsLoading }
)(Posts)
