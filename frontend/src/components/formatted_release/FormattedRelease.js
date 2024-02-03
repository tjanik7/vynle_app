import React from "react"
import PropTypes from "prop-types"

import './css/FormattedRelease.css'

/* Displays Spotify release art with release name and artist name listed below */

function getFormattedJSX(releaseData) {
    if (!releaseData) {
        return null
    }
    return (
        <>
            <div className={'fr-release-container'}>
                <img className={'fr-image-container'} src={releaseData.img} alt={'A Spotify Release'}/>
                <div className={'fr-release-info'}>
                    <p className={'fr-info-line'}>{releaseData.name}</p>
                    <p className={'fr-info-line'}>{releaseData.artist}</p>
                </div>
            </div>
        </>
    )
    
}

function FormattedRelease(props) {

    return getFormattedJSX(props.releaseData)
}

FormattedRelease.propTypes = {
        releaseData: PropTypes.object,
}

export default FormattedRelease