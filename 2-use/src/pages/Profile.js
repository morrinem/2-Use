import React, {useEffect, useState,useContext} from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { UserContext, LoginContext } from '../Helper/Context';
import Background from "../images/image2.png"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import logo from '../images/image2.png';
import cse from '../images/image2.png';


const Container = styled.div`
    width: 100vw;
    height: 50vh;
    background:linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Background}) center;
    background-size: cover;
    background-attachment: fixed;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Wrapper = styled.div`
    width: 50%;
    padding: 20px;
    background-color: white;
    border-radius: 30px;
    ${mobile({width:"50%"})};
`


const Title = styled.h1`
    font-size: 30px;
    font-weight: 300;
    color: teal;
    text-align: center;
    
`

const Description = styled.span`
    text-align: center;
    font-size: 20px;
    margin: 20px 0px;
    color: teal;
`

function  Profile() {
    const {loggedIn, setLoggedIn }= useContext(LoginContext)
    const [username,setUsername] = useState("")
    const [userage,setUserage] = useState("")
    const [university, setUniversity] = useState("")
    const [id,setId] = useState("")
    const [listOfPosts,setListOfPosts] = useState([])
    console.log("id is ", id)

    useEffect(() => {
        const profileInfo = async () => {
            const token = localStorage.getItem('token')


            await axios.get('http://localhost:3001/auth/profile',
                {headers: {"x-access-token": token}}
            ).then((response) => {

                setId(response.data.id)
                console.log("response.data is ", response.data)
                setUsername(response.data.username)
                setUserage(response.data.age)
                setUniversity(response.data.university)
            })
            
            await axios.get('http://localhost:3001/posts/byuserId',
                {headers: {"x-access-token": token}}
            ).then((response) => {

                console.log("res.data is ", response.data)
                setListOfPosts(response.data)
            })
            
           


        }
        profileInfo()
    },[])
    return (
    <div>
        <Navbar/>
        <Container>
            <Wrapper>
                <Title><b>My Profile</b><br/><br/>
                Username: {username}<br/><br/>
                Age: {userage}<br/><br/>
                University: {university}
                </Title>
            </Wrapper>

        </Container>
        <div className="App">
            {listOfPosts.map((value, key) => {
                return <div className="post">
                    <div className="title">{value.title}</div>
                    <div className="body">{value.postText}</div>
                    <div className="footer">{value.username}
                    </div>
                </div>})}
        </div>
        <Footer/>


        </div>
    )
}

export default Profile