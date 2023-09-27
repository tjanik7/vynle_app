import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './layout/Header'
import Feed from './posts/Feed'
import Form from './posts/Form'
import Login from './accounts/Login'
import Register from './accounts/Register'
import PrivateRoute from './common/PrivateRoute'

import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth'
import SpotifyRedirect from './spotify/SpotifyRedirect'
import PostDetail from './posts/PostDetail'
import ProfileDetail from'./profile/ProfileDetail'

import '../../sass/main.css'
import ProfileAsFunc from "./spotify/ProfileAsFunc"

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
                        {/* Margin configured below moves everything below the navbar */}
                        <div className={'container'} style={{marginTop: '75px'}}>
                            <Routes>
                                <Route path={'/create-post-form'} element={<PrivateRoute>
                                    <Form />
                                </PrivateRoute>} />
                                <Route path={'/spotify-redirect'} element={<PrivateRoute>
                                    <SpotifyRedirect/>
                                </PrivateRoute>} />
                                <Route path={'/spotify-profile'} element={<PrivateRoute>
                                    <ProfileAsFunc/>
                                </PrivateRoute>} />
                                <Route path='/' element={<PrivateRoute>
                                    <Feed/>
                                </PrivateRoute>
                                } />
                                <Route path={'/post/:id'} element={<PrivateRoute>
                                    <PostDetail/>
                                </PrivateRoute>
                                } />
                                <Route path={'/user/:username'} element={<PrivateRoute>
                                    <ProfileDetail/>
                                </PrivateRoute>
                                } />
                                <Route path={'/register'} element={<Register/>}/>
                                <Route path={'/login'} element={<Login/>}/>
                            </Routes>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
