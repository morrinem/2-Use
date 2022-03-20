import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import '../App.css'

const CreatePosts = () => {
    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
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
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. John123...)"
                    />

                    <button type="submit"> Create Post</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreatePosts;