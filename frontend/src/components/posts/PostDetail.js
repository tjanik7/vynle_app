import React, { useEffect } from "react"
import { connect } from "react-redux"

import { useParams } from "react-router-dom"
import { clearPostDetail, getPost } from "../../actions/posts"
import Post from "./Post"
import Comment from "./comments/Comment"
import CommentCreationForm from "./comments/CommentCreationForm"

function PostDetail(props) {
    const {id} = useParams()

    useEffect(() => {
        props.getPost(id)

        return () => props.clearPostDetail() // Return cleanup function
    }, [id]) // Need empty dep array otherwise it requests infinitely

    if (props.loading === false) {
        if (props.postDetail) {
            return (
            <>
                <Post
                    body={props.postDetail.body}
                    albumData={props.postDetail.album_data}
                    username={props.postDetail.user.username}
                    postID={props.postDetail.id}
                />
                <CommentCreationForm/>
                <Comment
                    username={'cmullins'}
                    body={'This is a comment about the above post.'}
                />
            </>
            )

        } else if (props.errorStatus === '404') {
            return (<h2>This post could not be found.</h2>)
        } else {
            return (<h2>There was an error</h2>)
        }
    } else {
        return (<h2>Loading...</h2>)
    }
}

const mapStateToProps = state => ({
    postDetail: state.posts.postDetail,
    loading: state.posts.postsLoading,
    errorStatus: state.posts.errorStatus,
})

export default connect(mapStateToProps, {
    getPost,
    clearPostDetail,
})(PostDetail)