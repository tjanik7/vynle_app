import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Post extends Component {
    static propTypes = {
        body: PropTypes.string.isRequired,
        song: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div className={'card border-light mb-3'} style={{ maxWidth: 30 + 'rem' }}>
                <div className={'card-header'}>
                    <h3>{this.props.username}</h3>
                </div>
                <div className={'card-body'}>
                    <p className={'card-text'}>{this.props.body}</p>
                    <p className={'card-text'}>{this.props.song}</p>
                </div>
            </div>
        )
    }
}

export default Post