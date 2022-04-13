import React from 'react'
import styled from 'styled-components'

import Background from "../images/image2.png"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mobile } from '../responsive'


const Container = styled.div`
    width: 100vw;
    height: 50vh;
    background:linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Background}) center;
    background-size: cover;
    background-attachment: fixed;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Wrapper = styled.div`
    width: 50%;
    padding: 20px;
    background-color: white;
    border-radius: 30px;
    ${mobile({width:"50%"})};
`


const Title = styled.h1`
    font-size: 30px;
    font-weight: 300;
    color: teal;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    
`

const Description = styled.span`
    font-size: 20px;
    margin: 20px 0px;
    color: teal;
`


const About = () => {
    return (
    <div>
        <Navbar/>
        <Container>
            <Wrapper>
                <Title><b>About Us</b></Title>
                <Form>
                    <Description>
                    2USE is a social start-up beginning its roots in the TCD Enactus Society. 2USE aims to tackle some of the largest concerns in students’ 
                    lives: Financial strain and climate change. This secure, online platform is designed specifically for students and will enable the buying
                    and selling of used goods to reduce waste, educate on and contribute to a circular economy campus.
                    </Description>
                </Form>
            </Wrapper>
        </Container>
        <Container>
            <Wrapper>
                <Title><b>Our Mission</b></Title>
                <Form>
                    <Description>
                    To provide an inclusive student-selling platform driven by community,
                    to reduce financial strain and waste in Dublin and beyond.
                    </Description>
                </Form>
            </Wrapper>
        </Container>
        <Container>
            <Wrapper>
                <Title><b>Our Vision</b></Title>
                <Form>
                    <Description>
                    To improve the lives of students globally, providing the top platform for creating a circular economy campus.
                    </Description>
                </Form>
            </Wrapper>
        </Container>
        <Footer/>
        </div>
    )
}

export default About