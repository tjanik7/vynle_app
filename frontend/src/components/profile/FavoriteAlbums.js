import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import CoverArt from "../cover_art/CoverArt"
import PropTypes from "prop-types"
import Search from "../search/Search"
import { setSelectedIndex } from "../../actions/spotifySearch"
import { connect } from "react-redux"
import { setFavAlbum } from "../../actions/profile"
import './css/FavoriteAlbums.css'

function generateAlbumTags(props, setSearchDisplayed, isClickable) {
    const columns = []

    for (let i = 0; i < 6; i++) {  // Generates JSX tags for album art
        columns.push(
            <Col className={'tst-col'} key={i}>
                <CoverArt
                    albumData={props.profile.favoriteAlbums[i]}
                    isClickable={isClickable}
                    fontSize={11}
                    ind={i}
                    displayReleaseInfoText={true}
                    handleClick={() => {
                        props.setSelectedIndex(i)
                        setSearchDisplayed(true)
                    }}
                />
            </Col>
        )
    }
    return columns
}

function FavoriteAlbums(props) {

    useEffect(() => {
        return () => {
            setSearchDisplayed(false)
        }
    }, [props.id])

    const {isProfileOwner} = props
    const [searchDisplayed, setSearchDisplayed] = useState(false)

    return (
        <>
            <Container>
                <Row className={'tst-row'} xs={6}>
                    {generateAlbumTags(props, setSearchDisplayed, isProfileOwner)}
                </Row>
            </Container>
            <div>
                {searchDisplayed && <Search
                    clickFunction={props.setFavAlbum}
                    clearSearchVisibility={() => {
                        setSearchDisplayed(false)
                    }}
                    clickFunctionArgs={[props.selectedIndex]}
                />}
            </div>
        </>
    )
}

FavoriteAlbums.propTypes = {
    isProfileOwner: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    id: state.spotify.id,
    profile: state.profile,
    selectedIndex: state.spotifySearch.selectedIndex,
})

export default connect(mapStateToProps, {
    setFavAlbum,
    setSelectedIndex,
})(FavoriteAlbums)