import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAlbumData } from '../../actions/profile'
import { setSearchVisibility, setSelectedIndex } from '../../actions/spotifySearch'
import './css/CoverArt.css'

class CoverArt extends Component {
    static propTypes = {
        ind: PropTypes.number.isRequired,
        getAlbumData: PropTypes.func.isRequired,
    }

    onClickHandler = e => {
        this.props.setSearchVisibility(true)
        this.props.setSelectedIndex(this.props.ind)
    }

    render() {
        const album = this.props.albumData

        return (
            <Fragment>
                <img
                    src={album.data.img ? album.data.img : '/static/img/plus.png'}
                    alt={'Album'}
                    className={'album-art-img'}
                    onClick={this.onClickHandler}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getAlbumData, setSearchVisibility, setSelectedIndex })(CoverArt)