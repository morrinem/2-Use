import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginRegister from "./pages/LoginRegister"
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import About from "./pages/About";
import React, { createContext, useState, useEffect } from 'react'
import { LoginContext } from './Helper/Context'
/* 
Replace <Home/> below with <ProductPage/> to view the product page
I'll link it up with the home page after
--Michael
*/

function App() {
    const token = localStorage.getItem('token')
    const [loggedIn, setLoggedIn] = useState(token ? true : false)
    
  return (
    
      <LoginContext.Provider value={{loggedIn, setLoggedIn}} > 
        <Router>
            <Route path='/' exact component={Home} />
            <Route path='/loginRegister' exact component={LoginRegister} />
            <Route path='/ProductPage' exact component={ProductPage} />
            <Route path='/ProductList' exact component={ProductList} />
            <Route path='/Product' exact component={Product} />
            <Route path='/About' exact component={About} />
        </Router>

      </LoginContext.Provider>

  )
}

export default App;
