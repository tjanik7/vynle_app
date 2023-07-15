import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSearchVisibility } from '../../actions/spotifySearch'
import './css/CoverArt.css'

/*
    albumData takes the form:
    {
        albumID: str,
        data: {
            artist: str,
            img: str (url for image),
            name: str (name of album),
        }
    }
*/

class CoverArt extends Component {
    static propTypes = {
        handleClick: PropTypes.func,
        albumData: PropTypes.object,
    }

    render() {
        const album = this.props.albumData

        return (
            <Fragment>
                <img
                    src={album.data.img ? album.data.img : '/static/img/plus.png'}
                    alt={'Album'}
                    className={'album-art-img'}
                    onClick={() => {
                        this.props.setSearchVisibility(true)

                        // Only call callback func if it exists
                        if (this.props.handleClick) {
                            this.props.handleClick()
                        }
                    }}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { setSearchVisibility })(CoverArt)