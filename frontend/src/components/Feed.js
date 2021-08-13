import React, { Component } from "react";
import {Button} from "@material-ui/core";
import { Link } from "react-router-dom";
import Post from "./Post";

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            loading: true,
        }
    }

    async componentDidMount() {
        const url = "/users/get-posts"
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    posts: data,
                    loading: false,
                })
            })
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        const posts = this.state.posts.map((post) =>{
            return (
                <div>
                    <Post name={post.name} body={post.body}/>
                </div>
            )
        })

        return (
            <div>
                <ul>{ posts }</ul>
                <Button color={"primary"} to={"/create"} component={Link}>
                    Create a Post
                </Button>
            </div>
        );
    }
}
