import React from "react"
import { connect } from "react-redux"

import { useParams } from "react-router-dom"

function PostDetail() {
    const {id} = useParams()

    return (
        <>
            <h1>you made it</h1>
            <h2>{id}</h2>
        </>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(PostDetail)