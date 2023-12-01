import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './css/CoverArt.css'

class CoverArt extends Component {
    static propTypes = {
        handleClick: PropTypes.func,
        albumData: PropTypes.object,
        isClickable: PropTypes.bool,
    }

    render() {
        const release = this.props.albumData.release

        // If no art is set, and it is not clickable (meaning they are not the owner of this profile)
        if(!release?.img && !this.props.isClickable) {
            return (
                <Fragment>
                    <div className={'no-art-set'}></div>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <img
                    src={release?.img ? release.img : 'http://localhost:8000/static/img/plus.png'}
                    alt={'Album'}
                    className={'album-art-img ' + (this.props.isClickable ? 'clickable' : null)}
                    onClick={() => {
                        // Only call callback func if it exists and is clickable
                        if (this.props.isClickable && this.props.handleClick) {
                            this.props.handleClick()
                        }
                    }}
                />
            </Fragment>
        )
    }
}

CoverArt.defaultProps = {
    isClickable: true,
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(CoverArt)