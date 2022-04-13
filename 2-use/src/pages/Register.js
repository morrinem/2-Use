import React, { useState, useContext } from "react";
import { UserContext, LoginContext } from "../Helper/Context";
import axios from "axios";
import NavbarLogin from '../components/NavbarLogin'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { Link } from "react-router-dom"

const Body = styled.div`
    background: #eeeeee;
`

const Box = styled.div`
    background:#fff;
    width: 350px;
    border-radius:6px;
    padding-top: 15px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 50px;
    margin-top: 50px;
    margin-bottom: 250px;
    box-shadow:15px 15px 0px rgba(0,0,0,.1);
    font-size: 10px;
    
`

const Center = styled.div`
    text-align: center;
`

const Text = styled.h1`
    padding-top: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
    font-size: 20px;
`

const Place = styled.input`
    position: relative;
    width: 89%;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 7px;
    margin: 10px;
    margin-bottom: 20px;
    padding-left: 10px;
    font-size: 17px;
`

const Button = styled.button`
    width: 95%;
    position: relative;
    top: 20px;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
    cursor: pointer;
    border-color: teal;
    padding: 8px;
    border-radius: 30px;
    border-width: 3px;
    &:hover{
        background-color: #ced4c5;
        transform: scale(1.05);
    }
`
const Div1 = styled.h1`
    font-size: 18px;
    border-bottom: solid #63b47a;
    position: relative;
    left: 40px;
    padding-bottom: 5px;
`

const Div2 = styled.button`
    font-size: 18px;
    color: #a0a0a0;
    position: relative;
    left: 150px;
    padding-bottom: 5px;
    border: none;
    background-color: transparent;
    border-bottom: solid #e0e0e0;
`

const Inline = styled.div`
    display: flex;
    margin-bottom: 30px;
    margin-top: 20px;
    
`

const File = styled.div`
    margin: 10px;
    margin-bottom: 20px;
`
const Register = () => {
    // const { userData, setUserData } = useContext(UserContext);
    const { loggedIn, setLoggedIn } = useContext(LoginContext)

    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

    const [user, setUser] = useState({
        name: "",
        password: "",
        passwordAgain: "",
        university: "",
        age: "",
    });

    const handleImageSubmit = async (e) => {
        e.preventDefault()
       
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newUser = {
                username: user.name,
                password: user.password,
                university: user.university,
                age: user.age,
                
            };

            if (user.password !== user.passwordAgain) {
                console.log("Enter the same password twice!");
                return;
            } else {
                console.log(newUser);
            }
            await axios.post('http://localhost:3001/auth/register', newUser);
            console.log("new user reged")
            const loginResponse = await axios.post('http://localhost:3001/auth/login',
                newUser);
            console.log(loginResponse)
            console.log("made it passed login")

            localStorage.setItem("token", loginResponse.data.token);
            setLoggedIn({
                hasToken: true,
                userId: user.id
            })

            setUser({
                username: "",
                password: "",
                passwordAgain: "",
                university: "",
                age: "",
                
            });

            let formData = new FormData()
            formData.append('file', image.data)
            const response = await fetch('http://localhost:3001/auth/image', {
                method: 'POST',
                body: formData,
            })

            if (response) setStatus(response.statusText)
        } catch (err) {
            console.log("We have some error!");
        }
    };
    
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((oldUser) => {
            return {
                ...oldUser,
                [name]: value,
            };
        });
    };

    return (
        <Body className="App">
            <NavbarLogin />
            <Box>
                <Inline>
                    <Div1>REGISTER</Div1>
                    <Link to="/Login">
                        <Div2 type="button" className="btn btn-info">LOG IN</Div2>
                    </Link>
                </Inline>
                <Text>REGISTER</Text>
                <Center>
                    <Place
                        type="text"
                        name="name"
                        placeholder="dslkjfdsk@tcd.ie"
                        value={user.name}
                        required
                        onChange={handleChange}
                    />

                </Center>
                <Text>PASSWORD</Text>
                <Center>
                    <Place
                        type="password"
                        name="password"
                        placeholder="djhfksd"
                        value={user.password}
                        onChange={handleChange}
                    />

                </Center>

                <Text>PASSWORD AGAIN</Text>
                <Center>
                    <Place
                        type="password"
                        name="passwordAgain"
                        placeholder="Ex. dhfksddskhjf"
                        value={user.passwordAgain}
                        onChange={handleChange}
                    />

                </Center>

                <Text>UNIVERSITY</Text>
                <Center>
                    <Place
                        type="text"
                        name="university"
                        placeholder="Ex. dhfksddskhjf"
                        value={user.university}
                        onChange={handleChange}
                    />

                </Center>

                <Text>AGE</Text>
                <Center>
                    <Place
                        type="text"
                        name="age"
                        placeholder="Ex. dhfksddskhjf"
                        value={user.age}
                        onChange={handleChange}
                    />

                </Center>



                <Text>PROFILE PHOTO</Text>
                <File>
                    {image.preview && <img src={image.preview} width='100' height='100' />}
                    <form>
                        <input type='file' name='file' onChange={handleFileChange}></input>
                    </form>
                    {status && <h4>{status}</h4>}
                </File>
                <Center>
                    <Button onClick={handleSubmit}>REGISTER</Button>
                </Center>
            </Box>
            <Footer />
        </Body>
    );
};

export default Register;



