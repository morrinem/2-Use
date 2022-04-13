import React, { useState, useContext } from "react";
import { UserContext, LoginContext } from '../Helper/Context';
import axios from "axios";
import styled from 'styled-components'
import NavbarLogin from '../components/NavbarLogin'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Input } from "@material-ui/core";
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

const Div1 = styled.button`
    font-size: 18px;
    color: #a0a0a0;
    position: relative;
    left: 40px;
    padding-bottom: 5px;
    border: none;
    background-color: transparent;
    border-bottom: solid #e0e0e0;
`

const Div2 = styled.h1`
    font-size: 18px;
    border-bottom: solid #63b47a;
    position: relative;
    left: 150px;
    padding-bottom: 5px;
`

const Inline = styled.div`
    display: flex;
    margin-bottom: 30px;
    margin-top: 20px;
    
`

const Center = styled.div`
    text-align: center;
`




const Login = () => {
    // const { userData, setUserData } = useContext(UserContext);
    const { loggedIn, setLoggedIn } = useContext(LoginContext)

    const [user, setUser] = useState({
        name: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newUser = {
                username: user.name,
                password: user.password,
            };

            const loginResponse = await axios.post('http://localhost:3001/auth/login', newUser);

            localStorage.setItem("token", loginResponse.data.token);

            setUser({
                name: "",
                password: "",
            });
            setLoggedIn({
                hasToken: true,
                userId: user.id
            })

        } catch (err) {
            console.log("We have an error!");
        }
    };

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
            <Box className="Login">
                    <Inline>
                        <Link to="/Register">
                            <Div1 type="button" className="btn btn-info">REGISTER</Div1>
                        </Link>
                        <Div2>LOG IN</Div2>
                    </Inline>
                <Text>EMAIL ADDRESS</Text>
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

                <Center>
                    <Button onClick={handleSubmit}>LOG IN</Button>
                </Center>

            </Box>
            <Footer />
        </Body>
    );
};

export default Login;


