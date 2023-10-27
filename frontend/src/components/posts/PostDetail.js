import React, { useEffect } from "react"
import { connect } from "react-redux"

import { useParams } from "react-router-dom"
import { clearPostDetail, getPost } from "../../actions/postDetail"
import Post from "./Post"
import Comments from "./comments/Comments"
import CommentCreationForm from "./comments/CommentCreationForm"

function PostDetail(props) {
    const {id} = useParams()

    useEffect(() => {
        props.getPost(id)

        return () => props.clearPostDetail() // Return cleanup function
    }, [id]) // Need dep array otherwise it requests infinitely

    if (props.loading === false) {
        if (props.postDetail) {
            return (
            <>
                <Post
                    body={props.postDetail.body}
                    albumData={props.postDetail.release}
                    username={props.postDetail.user.username}
                    postID={props.postDetail.id}
                />
                <CommentCreationForm postID={props.postDetail.id} />
                <Comments postID={props.postDetail.id}/>
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
    postDetail: state.postDetail.post,
    loading: state.postDetail.loading,
    errorStatus: state.postDetail.errorStatus,
})

export default connect(mapStateToProps, {
    getPost,
    clearPostDetail,
})(PostDetail)