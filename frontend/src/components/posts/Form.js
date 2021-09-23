import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/posts'
import { clearErrors } from '../../actions/errors'

class Form extends Component {
    state = { // holds current values of form fields
        body: '',
        song: ''
    }

    static propTypes = {
        addPost: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentWillUnmount() {
        this.props.clearErrors()
    }

    // componentDidUpdate(prevProps) {
    //     const { error } = this.props
    //     if (error !== prevProps.error) {
    //         console.log(this.props)
    //     }
    // }

    onChange = e => this.setState({
        [e.target.name]: e.target.value,
    })

    onSubmit = e => {
        e.preventDefault() // prevents default HTML element behavior which we do not want to allow to run
        const { body, song } = this.state
        const post = { body, song }
        this.props.addPost(post)
        this.setState({
            body: '',
            song: ''
        })
    }

    render() {
        // destructure state object into 'name' and 'body' variables
        const { song, body } = this.state
        const errors = this.props.errors
        const isError = errors.status !== null
        const fieldHasError = {
            'body': isError && ('body' in errors.msg),
            'song': isError && ('song' in errors.msg),
        }
        const bodyField = (
            !fieldHasError['body'] ? ( // if no error
                    <div className="form-group">
                        <label>Body</label>
                        <textarea
                            className="form-control"
                            name="body"
                            onChange={this.onChange}
                            value={body}
                        />
                    </div>
                ) : // if error
                (
                    <div className="form-group has-danger">
                        <label>Body</label>
                        <textarea
                            className="form-control is-invalid"
                            name="body"
                            onChange={this.onChange}
                            value={body}
                        />
                        <div className={'invalid-feedback'}>{errors.msg.body}</div>
                    </div>
                ))

        const songField = (
            !fieldHasError['song'] ? ( // if no error
                    <div className="form-group">
                        <label>Song</label>
                        <input
                            className="form-control"
                            type="text"
                            name="song"
                            onChange={this.onChange}
                            value={song}
                        />
                    </div>
                ) : // if error
                (
                    <div className="form-group has-danger">
                        <label>Song</label>
                        <input
                            className="form-control is-invalid"
                            type="text"
                            name="song"
                            onChange={this.onChange}
                            value={song}
                        />
                        <div className={'invalid-feedback'}>{errors.msg.song}</div>
                    </div>
                ))

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Create a Post</h2>
                <form onSubmit={this.onSubmit}>
                    {bodyField}
                    {songField}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                {/*{!isError ?*/}
                {/*    <p>there is no error guy chill</p> :*/}
                {/*    Object.entries(this.props.errors.msg).map(([key, value]) => (*/}
                {/*        <div key={key}>*/}
                {/*            <p>{key}</p>*/}
                {/*            <p>{value}</p>*/}
                {/*        </div>*/}
                {/*    ))}*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
})

export default connect(mapStateToProps, { addPost, clearErrors })(Form)
