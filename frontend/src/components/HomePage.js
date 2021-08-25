import React, {Component} from "react";
import CreatePost from "./CreatePost";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import Feed from "./Feed";
import Login from "./Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {getCookie} from "./csrftoken";

const csrftoken = getCookie('csrftoken');

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.handleLogoutButtonPressed = this.handleLogoutButtonPressed.bind(this)
    }

    handleLogoutButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken},
        }
        fetch('/users/logout', requestOptions)
            .then((response) => {
                if (response.ok) {
                    this.props.history.push('/login')
                }
            })
    }

    render() {
        return (
            <div>
                <p>Welcome to the Vynle homepage. You are authenticated.</p>
                <Button onClick={this.handleLogoutButtonPressed}>Logout</Button>
            </div>
        );
    }
}