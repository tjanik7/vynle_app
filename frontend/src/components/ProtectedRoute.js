import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
//
// let GetAuthStatus = async () => {
//     let isAuthenticated = await fetch("/users/get-auth-status")
//         .then((response) => response.json())
//         .then(data => {
//             return data.authenticated === 'true'
//         })
//     console.log('auth status: ' + isAuthenticated)
//     return isAuthenticated
// }
//
// function ProtectedRoute({component: Component, ...rest}) {
//     //const isAuthenticated = GetAuthStatus()
//     //console.log('auth status 2: ' + isAuthenticated)
//
//     return (
//         <Route
//             {...rest}
//             render={async (props) =>
//                 await GetAuthStatus() ? (<Component {...props} />) : (<Redirect to={"/login"}/>)
//             }
//         />
//     )
// }

//export default ProtectedRoute

class ProtectedRoute extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            isAuthenticated: false,
        }
    }

    async componentDidMount() {
        const auth_status = await fetch('/users/get-auth-status')
            .then((response) => response.json())
            .then(data => {
                return data.authenticated === 'true'
            })

        //console.log(auth_status)
        this.setState({
            isLoading: false,
            isAuthenticated: auth_status,
        })
    }

    render() {
        return this.state.isLoading ? null :
            (this.state.isAuthenticated ?
                <Route path={this.props.path} component={this.props.component} exact={this.props.exact} /> :
                <Redirect to={{ pathname: '/login', state: {from: this.props.location } }} />)
    }
}

export default ProtectedRoute
