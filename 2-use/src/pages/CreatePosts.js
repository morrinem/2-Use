import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import '../App.css'

const CreatePosts = () => {
    const initialValues = {
        title: "",
        postText: "",
        price: "",
        imageUrl: "",
    };
    const token = localStorage.getItem('token')
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data, {headers: {"x-access-token": token}}).then((response) => {
            console.log("IT WORKED");
        });
    };

    return (
        <div className="createPostPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="title"
                        placeholder="(Ex. Title...)"
                    />
                    <label>Description: </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="postText"
                        placeholder="(Ex. Description...)"
                    />
                    <label>Price: </label>
                    <ErrorMessage name="price" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="price"
                        placeholder="(Ex. 9.99...)"
                    />
                    <label>Image URL: </label>
                    <ErrorMessage name="Image" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="imageUrl"
                        placeholder="???"
                    />
                    <button type="submit"> Create Post</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreatePosts;
