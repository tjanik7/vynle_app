import axiosInstance from "../api/axiosInstance"
import { tokenConfig } from "./auth"

// DELETE THIS FILE

export const getProfile = (username, setProfile) => (dispatch, getState) => {
    axiosInstance()
        .get(`/users/${username}`, tokenConfig(getState))
        .then(res => {
            setProfile(res.data)
            console.log(`profile has been set to ${res.data}`)
        }).catch(err => {
            console.log(err)
    })
}