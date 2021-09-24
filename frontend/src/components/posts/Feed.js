// Dashboard
import React, { Fragment } from 'react'
import Form from './Form'
import Posts from './Posts'

export default function Feed() {
    return (
        <Fragment>
            <Form/>
            <div className={'justify-content-center'}>
                <Posts/>
            </div>
        </Fragment>
    )
}
