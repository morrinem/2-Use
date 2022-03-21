import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from "./pages/Login"
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import About from "./pages/About";
import React, { createContext, useState,useEffect } from 'react'
import { LoginContext } from './Helper/Context'
import Register from './pages/Register'
import Sell from './pages/Sell'
import Profile from './pages/Profile'
import Posts from './pages/Posts'
import CreatePosts from './pages/CreatePosts'
import Post from './pages/Post'
import axios from "axios"

/* 
Replace <Home/> below with <ProductPage/> to view the product page
I'll link it up with the home page after
--Michael
*/

function App() {
    
    const [loggedIn, setLoggedIn] = useState({
        hasToken: false,
        userId: undefined,
    })
    console.log("dhfksjhfjdkhsjk")

    useEffect(() => {
        const info = async () => {
            const token = localStorage.getItem('token')
            console.log("token is ", token)
            if(token != undefined && token.length > 2){
                console.log("token is not null")
                const userResponse = await axios.get('http://localhost:3001/auth/profile',
                    {headers: {"x-access-token": token}}
                )
                if(userResponse.data){
                    setLoggedIn({
                        hasToken: true,
                        userId:  userResponse.data
                    })
                }
                console.log("userResponse.data is " + userResponse.data)
                
            }else{
                setLoggedIn({
                    hasToken: false,
                    userId: undefined
                })
            }
            
            
            console.log("hihihihi")
        }
        info()
    },[])
    
    
  return (
    
      <LoginContext.Provider value={{loggedIn, setLoggedIn}} > 
        <Router>
            <Route path='/' exact component={Home} />
            <Route path='/Login' exact component={Login} />
            <Route path='/ProductPage' exact component={ProductPage} />
            <Route path='/ProductList' exact component={ProductList} />
            <Route path='/Product' exact component={Product} />
            <Route path='/About' exact component={About} />
            <Route path='/Register' exact component={Register} />
            <Route path='/Profile' exact component={Profile} />
            <Route path='/Posts' exact component={Posts} />
            <Route path='/CreatePosts' exact component={CreatePosts} />
            <Route path='/Post/:id' exact component={Post} />
            <Route path='/Sell' exact component={Sell} />
        </Router>

      </LoginContext.Provider>

  )
}

export default App;
