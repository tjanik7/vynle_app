import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { search } from '../../actions/spotifySearch'
import SlidingSwitch from './SlidingSwitch'
import DropdownRow from '../search/DropdownRow'
import { Col, Container, Row } from 'react-bootstrap'

const TIME_TO_WAIT = 1000 // ms to wait after user stops typing to send request

class Search extends Component {
    state = {
        q: '', // stores current value of search query bar
        t: null,
        tracksSelected: false,
    }

    static propTypes = {
        albums: PropTypes.array,
        tracks: PropTypes.array,
        search: PropTypes.func.isRequired,
    }

    sendQuery = () => {
        const { q, tracksSelected } = this.state
        const mediaType = tracksSelected ? 'track' : 'album'
        this.props.search(q, mediaType)
    }

    timerReset = (searchBarValue) => {
        const { t } = this.state
        clearTimeout(t)

        if (searchBarValue !== '') { // Only start new timer if search bar is nonempty
            this.setState({
                t: setTimeout(this.sendQuery, TIME_TO_WAIT)
            })
        }
    }

    onSearchbarChange = e => {
        // Update state based on the current value of the search bar
        this.setState({
            [e.target.name]: e.target.value,
        })
        this.timerReset(e.target.value)
    }

    // To be passed into sliding switch - toggles boolean state value when change is detected within the checkbox
    onCheckboxChange = e => {
        const { tracksSelected } = this.state
        this.setState({
            [e.target.name]: !tracksSelected,
        })
        const { q } = this.state
        this.timerReset(q)
    }

    render() {
        const { q, tracksSelected } = this.state
        return (
            <Fragment>
                <h3>Search for an Album or Song</h3>
                <form onSubmit={this.onSubmit}>
                    <SlidingSwitch isChecked={tracksSelected} onCheckboxChange={this.onCheckboxChange}/>
                    <div className={'form-group searchbar-form-group'}>
                        <input
                            className={'form-control'}
                            type={'text'}
                            name={'q'}
                            onChange={this.onSearchbarChange}
                            value={q}
                            placeholder={'Search...'}
                        />
                    </div>
                </form>
                <Container>
                    <Row>
                        <Col className={'dropdown-column'}>
                            {this.props.albums.map(result => (
                                <DropdownRow key={result.id} dataKey={result.id} media={result.name}
                                             artist={result.artists[0].name}
                                             img={result.images[1].url}/>
                            ))}
                        </Col>
                        <Col className={'dropdown-column'}>
                            {this.props.tracks.map(result => (
                                <DropdownRow key={result.id} dataKey={result.id} media={result.name}
                                             artist={result.artists[0].name}
                                             img={result.album.images[1].url}/>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        albums: state.spotifySearch.albums,
        tracks: state.spotifySearch.tracks,
    }
)

export default connect(mapStateToProps,
    {
        search
    }
)(Search)