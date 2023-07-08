import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAlbumData } from '../../actions/profile'
import { setSearchVisibility } from '../../actions/spotifySearch'
import './css/CoverArt.css'

class CoverArt extends Component {
    static propTypes = {
        handleClick: PropTypes.func,
        getAlbumData: PropTypes.func.isRequired,
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
                        this.props.handleClick()
                    }}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getAlbumData, setSearchVisibility })(CoverArt)