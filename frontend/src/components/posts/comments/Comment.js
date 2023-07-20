import React from "react"
import PropTypes from "prop-types"

import "./css/Comment.css"

function Comment(props) {
    return (
        <div className={'comment-container'}>
            <h4>{props.username}</h4>
            <p>{props.body}</p>
        </div>
    )
}

Comment.propTypes = {
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default Comment //NEXT NEED TO FILTER COMMENTS