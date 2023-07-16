import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './css/Post.css'
import { connect } from "react-redux"
import FormattedRelease from "../FormattedRelease/FormattedRelease"

class Post extends Component {
    static propTypes = {
        body: PropTypes.string.isRequired,
        album: PropTypes.string,
        username: PropTypes.string.isRequired,
        albumData: PropTypes.object,
    }

    formatAlbum = albumData => {
        if (!albumData) {
            return null
        }

        return (
            <div>
                <FormattedRelease releaseData={albumData}/>
            </div>
        )
    }

    render() {
        const albumData = this.props.albumData

        return (
            <>
                <div id={'username-field'}>
                    <h4>{this.props.username}</h4>
                </div>
                <div className={'post-container'}>
                    <div className={'item'}>
                        {this.formatAlbum(albumData)}
                    </div>
                    <div className={'item'}>
                        <p>{this.props.body}</p>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({})
export default connect(mapStateToProps, {})(Post)