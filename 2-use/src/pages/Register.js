import React, { useState, useContext } from "react";
import { UserContext, LoginContext } from "../Helper/Context";
import axios from "axios";
import '../Styles/login.css'
import NavbarLogin from '../components/NavbarLogin'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Register = () => {
   // const { userData, setUserData } = useContext(UserContext);
    const { loggedIn, setLoggedIn }= useContext(LoginContext)


    const [user, setUser] = useState({
        name: "",
        password: "",
        passwordAgain: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newUser = {
                username: user.name,
                password: user.password,
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

            console.log("made it passed login")
            /*setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.result,
            });*/

            localStorage.setItem("token", loginResponse.data.token);
            setLoggedIn(true)

            setUser({
                name: "",
                password: "",
                passwordAgain: "",
            });
            
        } catch (err) {
            console.log("We have some error!");
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
        <div className="App">
            <NavbarLogin/>
            <div className="Registration">

                <h1>Registration</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Ex. murphr64@tcd.ie"
                    value={user.name}
                    required
                    onChange={handleChange}
                />

                <h1>Password</h1>
                <input
                    type="password"
                    name="password"
                    placeholder="Ex. dhfksddskhjf"
                    value={user.password}
                    onChange={handleChange}
                />

                <h1>Password Again</h1>
                <input
                    type="password"
                    name="passwordAgain"
                    placeholder="Ex. dhfksddskhjf"
                    value={user.passwordAgain}
                    onChange={handleChange}
                />

                <button onClick={handleSubmit}>Register</button>
            </div>
            <Footer />
        </div>
    );
};

export default Register;



