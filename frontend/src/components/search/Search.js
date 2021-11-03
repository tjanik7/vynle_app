import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { search } from '../../actions/spotifySearch'
import DropdownRow from '../search/DropdownRow'

class Search extends Component {
    state = {
        q: '', // stores current value of search query bar
    }

    static propTypes = {
        queryResults: PropTypes.array,
        search: PropTypes.func.isRequired,
    }

    // Keeps state updated based on the current value of the search bar
    onChange = e => this.setState({
        [e.target.name]: e.target.value,
    })

    onSubmit = e => {
        e.preventDefault()
        const { q } = this.state
        this.props.search(q)
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
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                {this.props.queryResults.map(result => (
                    <DropdownRow key={result.id} media={result.name} artist={result.artists[0].name}/>
                ))}
            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        queryResults: state.spotifySearch.queryResults,
    }
)

export default connect(mapStateToProps,
    {
        search
    }
)(Search)