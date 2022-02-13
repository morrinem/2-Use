import {useState} from "react";
import Axios from 'axios'
import '../Styles/login.css'
import NavbarLogin from '../components/NavbarLogin'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'




function LoginRegister() {

    const [passwordReg, setPasswordReg] = useState('')
    const [usernameReg, setUsernameReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')

    const register = () => {
        const tcdEmail = "tcd.ie"
        //check for tcd email
        if(usernameReg.substring(usernameReg.length-tcdEmail.length) == tcdEmail){
            Axios.post('http://localhost:3001/register',
                {username: usernameReg,
                    password: passwordReg,
                }).then((response) => {
                console.log(response)
            })
            setLoginStatus("Registered")
        }else{
            setLoginStatus("Not a valid tcd email!")
        }

    }

    const login = () => {
        Axios.post('http://localhost:3001/login',
            {username: username,
                password: password,
            }).then((response) => {
            if(response.data.message){
                setLoginStatus(response.data.message)
            }else{
                setLoginStatus("Logged in!")
            }

        })
    }

    return (
        <div className="App">
        <NavbarLogin/>
            <div className="Registration">

                <h1>Registration</h1>
                <input type="text"
                       placeholder="Ex. murphr64@tcd.ie"
                       onChange={(event) => {
                           setUsernameReg(event.target.value)
                       }}/>

                <input type="text"
                       placeholder="Ex. password123"
                       onChange={(event) => {
                           setPasswordReg(event.target.value)
                       }}/>

                <button onClick={register}>Register</button>
            </div>
            <div className="Login">
                <h1>Login</h1>
                <input type="text"
                       placeholder="Ex. murphr64@tcd.ie"
                       onChange={(event) => {
                           setUsername(event.target.value)
                       }}/>
                <input type="text"
                       placeholder="Ex. password123"
                       onChange={(event) => {
                           setPassword(event.target.value)
                       }}/>

                <button onClick={login}>Login</button>
            </div>
            <h1>{loginStatus}</h1>
            <Footer />
        </div>
    );
}

export default LoginRegister;