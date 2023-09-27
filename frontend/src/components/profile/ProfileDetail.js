import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AxiosInstance from "../../api/axiosInstance"
import { useSelector } from "react-redux"
import { formatHeader } from "../../actions/auth"

function ProfileDetail() {
    const {username} = useParams()
    const [profile, setProfile] = useState()
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        AxiosInstance
            .get(`/users/${username}`, formatHeader(token))
        .then(res => {
            setProfile(res.data)
            console.log(`profile has been set to ${res.data}`)
        }).catch(err => {
            console.log(err)
    })
    }, [username])
    console.log(profile)

    if(profile) {
        return (
            <h2>This is a profile detail component for {username} ({profile.first} {profile.last})</h2>
        )
    } else {
        return (<h2>No profile found</h2>)
    }
}
export default ProfileDetail