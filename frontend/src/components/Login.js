import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {TextField, Typography, Grid, Button} from '@material-ui/core'
import Feed from "./Feed";
import CreatePost from "./CreatePost";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
        }
    }

    async componentDidMount() {
        fetch("/users/get-auth-status")
            .then((response) => response.json())
            .then(data => {
                if (data.authenticated === 'true') {
                    this.setState({
                        authenticated: true
                    })
                } else {
                    this.setState({
                        authenticated: false
                    })
                }
            })
    }

    render() {
        return this.state.authenticated ? <Redirect to={'/'} /> : (
            <Grid container spacing={1}>
                <Grid item xs={12} align={'center'}>
                    <Typography variant={'h3'} gutterBottom>
                        Login
                    </Typography>
                </Grid>
                <Grid item xs={12} align={'center'}>
                    <TextField id={'standard-basic'} label={'Email'}/>
                </Grid>
                <Grid item xs={12} align={'center'}>
                    <TextField
                        id={'standard-password-input'}
                        label={'Password'}
                        type={'password'}
                    />
                </Grid>
                <Grid item xs={12} align={'center'}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                    >
                        Sign in
                    </Button>
                </Grid>
            </Grid>
        )
    }
}