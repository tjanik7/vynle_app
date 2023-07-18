import React from "react"
import PropTypes from "prop-types"
import FormattedRelease from "../FormattedRelease/FormattedRelease"
import './css/Post.css'
import { connect } from "react-redux"

function formatAlbum(albumData) {
    if (!albumData) {
        return null
    }

    return (
        <div>
            <FormattedRelease releaseData={albumData}/>
        </div>
    )
}

function Post(props) {
    const albumData = props.albumData
    return (
        <>
            <div id={'username-field'}>
                <h4>{props.username}</h4>
            </div>
            <div className={'post-container'}>
                <div className={'item'}>
                    {formatAlbum(albumData)}
                </div>
                <div className={'item'}>
                    <p>{props.body}</p>
                </div>
            </div>
        </>
    )
}

Post.propTypes = {
    body: PropTypes.string.isRequired,
    album: PropTypes.string,
    username: PropTypes.string.isRequired,
    albumData: PropTypes.object,
}

const mapStateToProps = state => ({})
export default connect(mapStateToProps, {})(Post)