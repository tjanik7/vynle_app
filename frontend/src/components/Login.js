import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Feed from "./Feed";
import CreatePost from "./CreatePost";

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>this is the login page</div>
        );
    }
}