// Home page of application when user is authenticated
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import Posts from './Posts'
import { getSpotifyAuthStatus } from '../../actions/spotify'
import PropTypes from 'prop-types'

class Feed extends Component {
    static propTypes = {
        isSpotifyAuthenticated: PropTypes.bool,
        getSpotifyAuthStatus: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getSpotifyAuthStatus()
    }

    render() {
        return (
            <Fragment>
                <Form/>
                <div className={'justify-content-center'}>
                    <Posts/>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
})

export default connect(mapStateToProps, { getSpotifyAuthStatus })(Feed)

// export default function Feed() {
//
//     return (
//         <Fragment>
//             <Form/>
//             <div className={'justify-content-center'}>
//                 <Posts/>
//             </div>
//         </Fragment>
//     )
// }
