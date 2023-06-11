import React, {useState} from "react"
import {addPost, clearPostSubmissionStatus} from "../../actions/posts"
import {connect} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {useEffect} from "react"

function Form(props) {
    // Set default values for the form fields
    const [postBody, setPostBody] = useState('')
    const [postSong, setPostSong] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (props.submissionStatus === 'submitted') { // TODO: Check for err conditions / notify user post is submitting
            navigate('/')
        }

        // Clean up function - i.e. what componentWillUnmount use to be
        return function cleanup() {
            // Set postSubmissionStatus to the empty string
            props.clearPostSubmissionStatus()
        }
    })

    // Define onSubmit (see if this also works with 'const' instead of 'let')
    let onSubmit = e => {
        e.preventDefault()

        const post = {
            'body': postBody,
            'song': postSong
        }

        // Needs to be accessed via props, cannot just import it and call it
        props.addPost(post)

        // navigate('/')
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
                    <label>Song</label>
                    <input
                        className={'form-control'}
                        type={'text'}
                        name={'song'}
                        value={postSong}
                        onChange={(e) => setPostSong(e.target.value)}
                    />
                </div>
                <div className={'form-group'}>
                    <button type={'submit'} className={'btn btn-primary my-2'}>Submit</button>
                    <Link to={'/'} className={'btn btn-secondary my-2'}>Cancel</Link>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    submissionStatus: state.posts.submissionStatus,
})

export default connect(mapStateToProps, {addPost, clearPostSubmissionStatus})(Form)