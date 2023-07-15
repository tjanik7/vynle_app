import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { getPosts, deletePost } from '../../actions/posts'
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

    render() {
        return (
            <Container>
                <Row className={'justify-content-md-center'}>
                    <Col md={4}>
                        <h2>Posts</h2>
                    </Col>
                </Row>
                {this.props.posts.map(post => (
                    <Row key={post.id} className={'justify-content-md-center'}>
                        <Col md={8}>
                            <Post
                                username={post.user.username}
                                body={post.body}
                                song={post.song}
                                albumData={post.album_data}
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
    posts: state.posts.posts // storing the attribute 'posts' from the posts reducer
    // of the redux state in this.props.posts
    // the name of the prop we want to store this in is specified on the LHS of this line
})

export default connect(
    mapStateToProps,
    { getPosts, deletePost }
)(Posts)
