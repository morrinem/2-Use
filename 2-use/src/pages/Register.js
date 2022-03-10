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
        university:"",
        age: "",
    });

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
                age:"",
                
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
            <div >
                <h1>Register</h1>
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

                <h1>Password Again</h1>
                         <input
                             type="password"
                             name="passwordAgain"
                             placeholder="Ex. dhfksddskhjf"
                             value={user.passwordAgain}
                             onChange={handleChange}
                         />

                <h1>university</h1>
                <input
                    type="text"
                    name="university"
                    placeholder="Ex. dhfksddskhjf"
                    value={user.university}
                    onChange={handleChange}
                />

                <h1>Age</h1>
                <input
                    type="text"
                    name="age"
                    placeholder="Ex. dhfksddskhjf"
                    value={user.age}
                    onChange={handleChange}
                />




                <button onClick={handleSubmit}>Register</button>
            </div>
            <Footer />
        </div>
    );
};

export default Register;



