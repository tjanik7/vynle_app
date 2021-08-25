import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import CreatePost from "./CreatePost";
import NotFound from "./NotFound"

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="center">
                <Router>
                    <Switch>
                        <Route exact path={"/login"} component={Login} />
                        <ProtectedRoute exact={true} path={"/"} component={HomePage} />
                        <ProtectedRoute exact={true} path={"/create"} component={CreatePost} />
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
