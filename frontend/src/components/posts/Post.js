import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CoverArt from "../cover_art/CoverArt"
import './css/Form.css'

class Post extends Component {
    static propTypes = {
        body: PropTypes.string.isRequired,
        song: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        albumData: PropTypes.object,
    }

    formatAlbum = (albumData) => {
        if (!albumData) {
            return null
        }

        const album = { // Reformat for <CoverArt/>
            albumID: '',
            data: albumData,
        }

        return (
            <div className={'post-form-cover-art-container'} >
                <CoverArt albumData={album} />
                <p>{albumData.name}</p>
                <p>{albumData.artist}</p>
            </div>
        )
    }

    render() {
        const albumData = this.props.albumData

        return (
            <div className={'card border-light mb-3'} style={{ maxWidth: 30 + 'rem' }}>
                <div className={'card-header'}>
                    <h3>{this.props.username}</h3>
                </div>
                <div className={'card-body'}>
                    <p className={'card-text'}>{this.props.body}</p>
                    <p className={'card-text'}>{this.props.song}</p>
                    {this.formatAlbum(albumData)}
                </div>
            </div>
        )
    }
}

export default Post