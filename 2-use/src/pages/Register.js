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
    
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

    const [user, setUser] = useState({
        name: "",
        password: "",
        passwordAgain: "",
        university:"",
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
                age:"",
                
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

                <h1>Profile Photo</h1>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <form>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                </form>
                {status && <h4>{status}</h4>}


                <button onClick={handleSubmit}>Register</button>
            </div>
            <Footer />
        </div>
    );
};

export default Register;



