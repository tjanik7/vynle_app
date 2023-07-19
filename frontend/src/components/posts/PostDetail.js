import React, { useEffect } from "react"
import { connect } from "react-redux"

import { useParams } from "react-router-dom"
import { getPost } from "../../actions/posts"
import Post from "./Post"

function PostDetail(props) {
    const {id} = useParams()

    useEffect(() => {
        props.getPost(id)
    }, [id]) // Need empty dep array otherwise it requests infinitely

    return ( // NOW NEED TO HANDLE WHAT TO RENDER IF REQUEST RETURNS A 404
        <>
            {!props.loading && props.postDetail && <Post
                body={props.postDetail.body}
                albumData={props.postDetail.album_data}
                username={props.postDetail.user.username}
            />}
        </>
    )
}

const mapStateToProps = state => ({
    postDetail: state.posts.postDetail,
    loading: state.posts.postsLoading,
})

export default connect(mapStateToProps, {getPost})(PostDetail)