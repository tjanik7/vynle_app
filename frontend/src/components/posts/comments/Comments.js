import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getComments } from "../../../actions/postDetail"
import Comment from "./Comment"

function Comments(props) {
    useEffect(() => {
        props.getComments(props.postID)
    }, [props.postID])

    return (
        <>
            {props.comments.map(comment => (
                <Comment
                    username={comment.user.username}
                    body={comment.body}
                    key={comment.id}
                />
            ))}
        </>
    )
}

Comments.propTypes = {
    postID: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
    comments: state.postDetail.comments,
})

export default connect(mapStateToProps, {getComments})(Comments)