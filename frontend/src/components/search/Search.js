import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { search, clearSearchResults } from '../../actions/spotifySearch'
import DropdownRow from '../search/DropdownRow'
import { Col, Container, Row } from 'react-bootstrap'
import './css/Search.css'

const TIME_TO_WAIT = 500 // ms to wait after user stops typing to send request

class Search extends Component {
    state = {
        q: '', // stores current value of search query bar
        t: null,
    }

    static propTypes = {
        albums: PropTypes.array,
        search: PropTypes.func.isRequired,
    }

    componentWillUnmount() {
        this.props.clearSearchResults()
    }

    sendQuery = () => {
        const { q } = this.state
        this.props.search(q)
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

    render() {
        const { q } = this.state
        return (
            <div className={'search-component'}>
                <h3>Search for Music</h3>
                <form onSubmit={this.onSubmit}>
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
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        albums: state.spotifySearch.albums,
    }
)

export default connect(mapStateToProps,
    {
        search,
        clearSearchResults
    }
)(Search)