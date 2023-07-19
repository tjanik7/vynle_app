import React, { useEffect } from "react"
import { connect } from "react-redux"

import { useParams } from "react-router-dom"
import { clearPostDetail, getPost } from "../../actions/posts"
import Post from "./Post"

function PostDetail(props) {
    const {id} = useParams()

    useEffect(() => {
        props.getPost(id)

        return () => props.clearPostDetail() // Return cleanup function
    }, [id]) // Need empty dep array otherwise it requests infinitely

    let contentToRender = null

    if (!props.postsLoading) {
        if (props.postDetail) {
            contentToRender = <Post
                body={props.postDetail.body}
                albumData={props.postDetail.album_data}
                username={props.postDetail.user.username}
                postID={props.postDetail.id}
            />
        } else if (props.errorStatus === '404') {
            contentToRender = <h2>This post could not be found.</h2>
        }
    }

    return (
        <>{contentToRender}</>
    )
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