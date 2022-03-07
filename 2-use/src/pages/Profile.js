import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'

function  Profile() {
    let { id } = useParams()
    const [username,setUsername] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })
    },[])
    return(
        <div className="profileContainer">
            <div className="basicInfo">
                <h1> Username: {username}</h1>
            </div>

        </div>
    )
}

export default Profile