import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './layout/Header'
import Feed from './posts/Feed'
import Form from './posts/Form'
import Login from './accounts/Login'
import Register from './accounts/Register'
import PrivateRoute from './common/PrivateRoute'

import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth'
import SpotifyProfile from './spotify/SpotifyProfile'
import SpotifyRedirect from './spotify/SpotifyRedirect'

import '../../sass/main.css'

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header/>
                        <div className={'container'}>
                            <Routes>
                                <Route path={'/create-post-form'} element={<PrivateRoute>
                                    <Form/>
                                </PrivateRoute>} />
                                <Route path={'/spotify-redirect'} element={<PrivateRoute>
                                    <SpotifyRedirect/>
                                </PrivateRoute>} />
                                <Route path={'/spotify-profile'} element={<PrivateRoute>
                                    <SpotifyProfile/>
                                </PrivateRoute>} />
                                <Route path='/' element={<PrivateRoute>
                                        <Feed/>
                                    </PrivateRoute>
                                } />
                                <Route exact path={'/register'} component={Register}/>
                                <Route path={'/login'} element={<Login/>}/>
                            </Routes>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))
