import React, {useContext} from 'react'
import {LoginContext} from '../Helper/Context'

import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
    
    const {loggedIn, setLoggedIn} = useContext(LoginContext)
    return (
        <div>
            <Announcement />
            <Navbar/>
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home
