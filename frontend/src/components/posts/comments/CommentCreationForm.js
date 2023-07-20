import React, { useState } from "react"
import { connect } from "react-redux"
import { addComment } from "../../../actions/postDetail"
import PropTypes from "prop-types"

function CommentCreationForm(props) {
    let handleSubmit = e => {
        e.preventDefault()
        props.addComment(props.postID, commentBody)
        setCommentBody('')
    }


    const [commentBody, setCommentBody] = useState('')

    return (
        <>
            <form onSubmit={handleSubmit}>
                <textarea value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
                <button type={'submit'} className={'btn btn-primary'}>
                    Comment
                </button>
            </form>
        </>
    )
}

CommentCreationForm.propTypes = {
    postID: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {
    addComment,
})(CommentCreationForm)