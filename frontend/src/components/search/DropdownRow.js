import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class DropdownRow extends Component {
    static propTypes = {
        media: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
    }

    render() {
        return (
            <Fragment>
                <div className={'card'}>
                    <div className={'card-body'}>
                        <h5 className={'card-title'}>{this.props.media}</h5>
                        <p className={'card-text'}>{this.props.artist}</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DropdownRow