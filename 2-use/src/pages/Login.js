import React, { useState, useContext } from "react";
import { UserContext, LoginContext } from '../Helper/Context';
import axios from "axios";
import '../Styles/login.css'
import NavbarLogin from '../components/NavbarLogin'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Login = () => {
   // const { userData, setUserData } = useContext(UserContext);
    const {loggedIn, setLoggedIn }= useContext(LoginContext)

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
        <div className="App">
            <NavbarLogin/>
            <div className="Login">
                <h1>Login</h1>
                <input type="text"
                    name="name"
                    placeholder="dslkjfdsk@tcd.ie"
                    value={user.name}
                    required
                    onChange={handleChange}
                />
                <h1>Password</h1>
                <input
                    type="password"
                    name="password"
                    placeholder="djhfksd"
                    value={user.password}
                    onChange={handleChange}
                />

                <button onClick={handleSubmit}>Login</button>
            </div>
            <Footer />
        </div>
    );
};

export default Login;


