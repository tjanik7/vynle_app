import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CoverArt from "../cover_art/CoverArt"
import './css/Post.css'
import { connect } from "react-redux"

class Post extends Component {
    static propTypes = {
        body: PropTypes.string.isRequired,
        song: PropTypes.string.isRequired,
        album: PropTypes.string,
        username: PropTypes.string.isRequired,
    }

    // state = {
    //     albumData: {
    //         albumID: '',
    //         data: {
    //             name: '',
    //             artist: '',
    //             img: '',
    //         }
    //     }
    // }

    render() {
        return (
            <div className={'card border-light mb-3'} style={{ maxWidth: 30 + 'rem' }}>
                <div className={'card-header'}>
                    <h3>{this.props.username}</h3>
                </div>
                <div className={'card-body'}>
                    <p className={'card-text'}>{this.props.body}</p>
                    <p className={'card-text'}>{this.props.song}</p>
                    <div className={'post-cover-art-container'}>
                        <CoverArt albumData={} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})
export default connect(mapStateToProps, {})(Post)