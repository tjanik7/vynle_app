import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/posts'

class Form extends Component {
    state = { // holds current values of form fields
        body: '',
        song: ''
    }

    static propTypes = {
        addPost: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props
        if (error !== prevProps.error) {
            console.log(this.props)
            // next: rather than print out the error object (which is what happens
            // currently), display it within the UI using bootstrap error messages
        }
    }

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

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Create a Post</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Body</label>
                        <textarea
                            className="form-control"
                            name="body"
                            onChange={this.onChange}
                            value={body}
                        />
                    </div>
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
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.errors,
})

export default connect(mapStateToProps, { addPost })(Form)
