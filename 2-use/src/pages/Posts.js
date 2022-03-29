import '../App.css'
import axios from "axios"
import React,{ useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

const Posts = () => {

    const [listOfPosts, setListOfPosts] = useState([])
    const [postId, setPostId] = useState("")
    let history = useHistory()
    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data)
            }
        )
    },[])

    const handleSubmit = valueId => (e) => {
        console.log("button pressed")
        fetch("http://localhost:3001/posts/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [

                  { id: valueId, quantity: 1 },
              ],
            }),
          })
            .then(res => {
              if (res.ok) return res.json()
              return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
              window.location = url
            })
            .catch(e => {
              console.error(e.error)
            })
    }

    return (
        <div className="App">
            {listOfPosts.map((value, key) => {
                return <div className="post">
                  <div className="title">{value.title}</div>
                    <div className="body">{value.postText}</div>
                    <div className="footer">{value.username}

                    <button onClick={handleSubmit(value.id)}>checkout</button>
                    </div>
                </div>})}
        </div>
    );
};

export default Posts;
