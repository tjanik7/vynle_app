import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    FormControl,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import CSRFToken from "./csrftoken";
import {getCookie} from "./csrftoken"

const csrftoken = getCookie('csrftoken');

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            post_body: "",
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleCreatePostButtonPressed = this.handleCreatePostButtonPressed.bind(this);
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value,
        });
    }

    handleBodyChange(e) {
        this.setState({
            post_body: e.target.value,
        });
    }

    handleCreatePostButtonPressed() {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken},
                body: JSON.stringify({
                    name: this.state.name,
                    body: this.state.post_body,
                }),
            };
            fetch("/users/create-post", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        this.props.history.push(`/`)
                    }
                })
        }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align={"center"}>
                    <Typography component="h4" variant="h4">
                        Create a post
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <CSRFToken/>
                        <TextField id={"standard-basic"} label={"Your Name"} onChange={this.handleNameChange} />
                        <TextField multiline id={"standard-multiline-flexible"} onChange={this.handleBodyChange} label={"What do you want to say?"} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleCreatePostButtonPressed}
                    >
                        Create a post
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to={"/"} component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
