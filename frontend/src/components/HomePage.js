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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Login} />
                    <Route path={"/create"} component={CreatePost} />
                </Switch>
            </Router>
        );
    }
}