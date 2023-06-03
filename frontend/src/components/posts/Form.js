import React, {useState} from "react"
import {addPost} from "../../actions/posts"
import {connect} from "react-redux"

function Form(props) {
    // Set default values for the form fields
    const [postBody, setPostBody] = useState('')
    const [postSong, setPostSong] = useState('')

    // WHERE TO PICK UP: POST SUCCESSFULLY SUBMITS, NOW NEED TO AUTO REDIRECT TO FEED (ALSO ADD CANCEL BUTTON ON FORM)
    // Define onSubmit (see if this also works with 'const' instead of 'let')
    let onSubmit = e => {
        console.log('in onSubmit')
        e.preventDefault()

        const post = {
            'body': postBody,
            'song': postSong
        }
        props.addPost(post)  // Why won't this run?
        console.log('made it to the bottom')
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
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {addPost})(Form)