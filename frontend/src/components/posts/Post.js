import React from "react"
import PropTypes from "prop-types"
import FormattedRelease from "../FormattedRelease/FormattedRelease"
import './css/Post.css'
import { useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()

    const albumData = props.albumData
    return (
        <>
            <div id={'username-field'}>
                <h4>{props.username}</h4>
            </div>
            <div className={'post-container'} onClick={() => navigate(`/post/${props.postID}`)}>
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
    username: PropTypes.string.isRequired,
    postID: PropTypes.number.isRequired,
    albumData: PropTypes.object,
}

const mapStateToProps = state => ({})
export default connect(mapStateToProps, {})(Post)