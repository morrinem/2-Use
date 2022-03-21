import React, { useState, useContext } from "react";
import { UserContext, LoginContext } from "../Helper/Context";
import axios from "axios";
import '../Styles/login.css'
import NavbarLogin from '../components/NavbarLogin'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Sell = () => {    
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

    const [item, setItem] = useState({
        itemName: "",
        itemDescription: "",
        itemPrice: "",
    });

    const handleImageSubmit = async (e) => {
        e.preventDefault()
       
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newItem = {
                newItemName: item.itemName,
                newItemDesription: item.itemDescription,
                newItemPrice: item.itemPrice,
                
            };
            console.log(newItem);
            await axios.post('http://localhost:3001/auth/Sell', newItem);
            console.log("new item reged")
            const loginResponse = await axios.post('http://localhost:3001/auth/login',
                newItem);
            console.log(loginResponse)
            console.log("made it passed login")

            localStorage.setItem("token", loginResponse.data.token);

            setItem({
                itemName: "",
                itemDescription: "",
                itemPrice: "",                
            });

            let formData = new FormData()
            formData.append('file', image.data)
            const response = await fetch('http://localhost:3001/Sell/image', {
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
        setItem((oldItem) => {
            return {
                ...oldItem,
                [name]: value,
            };
        });
    };

    return (
        <div className="App">
            <NavbarLogin/>
            <div >
                <h1>Item Name</h1>
                <input type="text"
                       name="itemName"
                       placeholder="Ex. Burberry Jacket"
                       value={item.itemName}
                       required
                       onChange={handleChange}
                />

                <h1>Item Description</h1>
                <input
                    type="text"
                    name="itemDescription"
                    placeholder="Ex. Blue jacket"
                    value={item.itemDescription}
                    onChange={handleChange}
                />

                <h1>Item Price</h1>
                <input
                    type="text"
                    name="itemPrice"
                    placeholder="Ex. €20"
                    value={item.itemPrice}
                    onChange={handleChange}
                />

                <h1>Item Photo</h1>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <form>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                </form>
                {status && <h4>{status}</h4>}


                <button onClick={handleSubmit}>Sell</button>
            </div>
            <Footer />
        </div>
    );
};

export default Sell;



