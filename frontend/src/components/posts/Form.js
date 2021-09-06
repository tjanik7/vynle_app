import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/posts';

class Form extends Component {
    state = { // holds current values of form fields
        name: '',
        body: ''
    };

    static propTypes = {
        addPost: PropTypes.func.isRequired,
    };

    onChange = e => this.setState({
        [e.target.name]: e.target.value,
    });

    onSubmit = e => {
        e.preventDefault(); // prevents default HTML element behavior which we do not want to allow to run
        const {name, body} = this.state;
        const post = {name, body};
        this.props.addPost(post);
        this.setState({
            name: '',
            body: ''
        });
    };

    render() {
        // destructure state object into 'name' and 'body' variables
        const {name, body} = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Lead</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={name}
                        />
                    </div>
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
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

// don't need mapStateToProps for this form since there is not a state being passed in via props from the reducer
export default connect(null, {addPost})(Form);
