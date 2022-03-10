import React, {useEffect, useState,useContext} from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { UserContext, LoginContext } from '../Helper/Context';

function  Profile() {
    const {loggedIn, setLoggedIn }= useContext(LoginContext)
    const [username,setUsername] = useState("")
    const [userage,setUserage] = useState("")
    const [university, setUniversity] = useState("")
    const [id,setId] = useState("")
    console.log("id is ", id)

    useEffect(() => {
        const profileInfo = async () => {
            const token = localStorage.getItem('token')


            await axios.get('http://localhost:3001/auth/profile',
                {headers: {"x-access-token": token}}
            ).then((response) => {
                
                console.log("response.data is ", response.data.username)
                setUsername(response.data.username)
                setUserage(response.data.age)
                setUniversity(response.data.university)
            })
            
           


        }
        profileInfo()
    },[])
    
    return(
        <div className="profileContainer">
            <div className="basicInfo">
                <h1> Username: {username}</h1>
                <h1>Age: {userage}</h1>
                <h1>University: {university}</h1>
            </div>

        </div>
    )
}

export default Profile