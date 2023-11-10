import React, { useEffect } from "react"
import AxiosInstance from "../../api/axiosInstance"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { formatHeader } from "../../api/formatHeader"

function SpotifyCallback() {
    const navigate = useNavigate()
    const token = useSelector(state => state.auth.token)
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    useEffect(() => {
        AxiosInstance
            .get(`/spotify/redirect?${params}`, formatHeader(token))
            .then(res => {
                navigate('/')
            })
    }, []);

    return (
        <h2>Finishing linking with Spotify...</h2>
    )
}

export default SpotifyCallback