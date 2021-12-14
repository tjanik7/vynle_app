import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAlbumData } from '../../actions/profile'

class CoverArt extends Component {
    static propTypes = {
        albumID: PropTypes.string.isRequired,
        ind: PropTypes.number.isRequired,
        getAlbumData: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getAlbumData(this.props.ind, this.props.albumID)
    }

    render() {
        const favoriteAlbums = this.props.favoriteAlbums[0]

        return (
            <Fragment>
                {this.props.favoriteAlbums[0].data.img ?
                    <p>there is an image</p>
                    :
                    <p>there is not an image</p>}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    favoriteAlbums: state.profile.favoriteAlbums,
})

export default connect(mapStateToProps, { getAlbumData })(CoverArt)