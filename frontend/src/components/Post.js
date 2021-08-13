import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const name = this.props.name
        const body = this.props.body

        return (
            <div>
                <p>{name}: {body}</p>
            </div>
        );
    }
}

// props typechecking
Post.propTypes = {
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

// default props
// Post.defaultProps = {
//     name: 'default name',
//     body: 'default body',
// }
