import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import '../App.css'

const CreatePosts = () => {
    const initialValues = {
        title: "",
        postText: "",
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
                    <label>Post: </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="postText"
                        placeholder="(Ex. Post...)"
                    />
                    <button type="submit"> Create Post</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreatePosts;