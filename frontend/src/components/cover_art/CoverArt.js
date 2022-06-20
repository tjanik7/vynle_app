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

    componentDidMount() {
        this.props.getAlbumData(this.props.ind)
    }

    render() {
        const album = this.props.favoriteAlbums[this.props.ind]

        return (
            <Fragment>
                {album.data.img ?
                    <img src={album.data.img} alt={'Album'} className={'album-art-img'} onClick={this.onClickHandler}/>
                    :
                    null}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    favoriteAlbums: state.profile.favoriteAlbums,
})

export default connect(mapStateToProps, { getAlbumData, setSearchVisibility, setSelectedIndex })(CoverArt)