import {useState, useEffect} from "react";
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



    const [loginStatus, setLoginStatus] = useState(false)

    Axios.defaults.withCredentials = true
    const register = () => {
        const tcdEmail = "tcd.ie"
        //check for tcd email
        if(usernameReg.substring(usernameReg.length-tcdEmail.length) == tcdEmail){
            Axios.post('http://localhost:3001/auth/register',
                {username: usernameReg,
                    password: passwordReg,
                }).then((response) => {
                console.log(response)
            })
        }

    }

    const login = () => {
        Axios.post('http://localhost:3001/auth/login',
            {username: username,
                password: password,
            }).then((response) => {
            if(!response.data.auth){
                setLoginStatus(false)
            }else{
                localStorage.setItem("token", response.data.token)
                setLoginStatus(true)
            }

        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/auth/login")
            .then((response) => {
                if(response.data.loggedIn == true){
                    setLoginStatus(response.data.user[0].username)
                }

            })
    },[])

    const userAuth = () => {
        Axios.get("http://localhost:3001/auth/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
        },
        }).then((response) => {
            console.log(response);
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
            <h1>{loginStatus && (
                <button onClick={userAuth}>Check if Auth</button>
            )}</h1>
            <Footer />
        </div>
    );
}

export default LoginRegister;