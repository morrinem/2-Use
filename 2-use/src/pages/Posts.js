import '../App.css'
import axios from "axios"
import React,{ useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

const Posts = () => {

    const [listOfPosts, setListOfPosts] = useState([])
    let history = useHistory()
    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data)
            }
        )
    },[])

    return (
        <div className="App">
            {listOfPosts.map((value, key) => {
                return <div className="post" onClick={() => {
                history.push(`/Post/${value.id}`)
                }
                }>
                  <div className="title">{value.title}</div>
                  <div className="image"><img src={value.imageUrl} width="100%"></img></div>
                  <div className="body">{value.postText}</div>
                  <div className="price">{value.price}</div>
                  <div className="footer">{value.username}</div>
                </div>})}
        </div>
    );
};

export default Posts;
