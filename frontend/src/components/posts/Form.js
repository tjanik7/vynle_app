import React, {useState} from "react"
import {addPost, clearPostSubmissionStatus} from "../../actions/posts"
import {connect} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {useEffect} from "react"
import Search from "../search/Search"
import CoverArt from "../cover_art/CoverArt"
import './css/Form.css'

function setSelectedAlbum(newAlbum, setPostAlbum) { // Callback function to be passed to <Search/>
    setPostAlbum(newAlbum)
}

function Form(props) {
    // Switch to only using local state now rather than the (global) redux store
    const [searchVisibility, setSearchVisibility] = useState(false)

    // Set default values for the form fields
    const [postBody, setPostBody] = useState('')

    const [postAlbum, setPostAlbum] = useState({
        spotify_release_uri: '',
        release: {
            artist: '',
            img: '',
            name: '',
        }
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (props.submissionStatus === 'submitted') { // TODO: Check for err conditions / notify user post is submitting
            navigate('/')
        }

        
        // Clean up function - i.e. what componentWillUnmount used to be
        return function cleanup() {
            // Set postSubmissionStatus to the empty string
            props.clearPostSubmissionStatus()
        }
    })

    let onSubmit = e => {
        e.preventDefault()

        const post = {
            'body': postBody,
            'spotify_release_uri': postAlbum.spotify_release_uri,
        }

        // Needs to be accessed via props, cannot just import it and call it due to the way React works
        props.addPost(post)

    }

    return (
        <div className={'card card-body mt-4 mb-4'}>
            <h2>Create a Post</h2>
            <form onSubmit={onSubmit}>
                <div className={'form-group'}>
                    <label>Body</label>
                    <textarea
                        className={'form-control'}
                        name={'body'}
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                    />
                </div>
                <div className={'form-group'}>
                    <button type={'submit'} className={'btn btn-primary my-2'}>Submit</button>
                    <Link to={'/'} className={'btn btn-secondary my-2'}>Cancel</Link>
                </div>
            </form>
            <label>Search Spotify for a Song</label>
            <div className={'post-form-cover-art-container'}>
                <CoverArt albumData={postAlbum} handleClick={() => {setSearchVisibility(true)}} />
            </div>
            <div className={'form-group'}>
                {searchVisibility && <Search
                    clickFunction={setSelectedAlbum}
                    clickFunctionArgs={[setPostAlbum]}
                    clearSearchVisibility={() =>{setSearchVisibility(false)}}
                />}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    submissionStatus: state.posts.submissionStatus,
    isSearchVisible: state.spotifySearch.isVisible,
})

export default connect(mapStateToProps, {
    addPost,
    clearPostSubmissionStatus,
})(Form)