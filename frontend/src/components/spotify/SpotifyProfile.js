import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentUserSpotifyProfile } from '../../actions/spotify'
import Search from '../search/Search'
import CoverArt from '../cover_art/CoverArt'
import { Col, Container, Row } from 'react-bootstrap'
import './css/SpotifyProfile.css'

class SpotifyProfile extends Component {
    state = {
        searchDisplayed: false, // bool to toggle whether the search tool should be displayed
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        isSearchVisible: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        this.props.getCurrentUserSpotifyProfile()
    }

    render() {
        return (
            <Fragment>
                <p>Your Spotify username is {this.props.id}</p>
                <Container>
                    <Row xs={6}>
                        <Col>
                            <CoverArt ind={0}/>
                        </Col>
                        <Col>
                            <CoverArt ind={1}/>
                        </Col>
                        <Col>
                            <CoverArt ind={2}/>
                        </Col>
                        <Col>
                            <CoverArt ind={3}/>
                        </Col>
                        <Col>
                            <CoverArt ind={4}/>
                        </Col>
                        <Col>
                            <CoverArt ind={5}/>
                        </Col>
                    </Row>
                </Container>
                {this.props.isSearchVisible ? <Search/> : null}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    id: state.spotify.id,
    isSearchVisible: state.spotifySearch.isVisible,
})

export default connect(mapStateToProps, { getCurrentUserSpotifyProfile })(SpotifyProfile)