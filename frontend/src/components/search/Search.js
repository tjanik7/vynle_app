import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { search } from '../../actions/spotifySearch'
import DropdownRow from '../search/DropdownRow'
import { Col, Container, Row } from 'react-bootstrap'

const TIME_TO_WAIT = 1500 // Length of time after user stops typing to send request

class Search extends Component {
    state = {
        q: '', // stores current value of search query bar
        t: null,
    }

    static propTypes = {
        albums: PropTypes.array,
        tracks: PropTypes.array,
        search: PropTypes.func.isRequired,
    }

    sendQuery = () => {
        const { q } = this.state
        console.log(`sending query: ${q}`)
        this.props.search(q)
    }

    onChange = e => {
        // Update state based on the current value of the search bar
        this.setState({
            [e.target.name]: e.target.value,
        })

        const { t } = this.state
        clearTimeout(t)
        console.log('resetting timer')

        if (e.target.value !== '') { // Only start new timer if search bar is nonempty
            this.setState({
                t: setTimeout(this.sendQuery, TIME_TO_WAIT)
            })
        }
    }

    render() {
        const { q } = this.state
        return (
            <Fragment>
                <h3>Search for an Album or Song</h3>
                <form onSubmit={this.onSubmit}>
                    <div className={'form-group'}>
                        <input
                            className={'form-control'}
                            type={'text'}
                            name={'q'}
                            onChange={this.onChange}
                            value={q}
                            placeholder={'Search...'}
                        />
                    </div>
                </form>
                <Container>
                    <Row>
                        <Col>
                            {this.props.albums.map(result => (
                                <DropdownRow key={result.id} media={result.name} artist={result.artists[0].name}/>
                            ))}
                        </Col>
                        <Col>
                            {this.props.tracks.map(result => (
                                <DropdownRow key={result.id} media={result.name} artist={result.artists[0].name}/>
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