import React from 'react'
import styled from 'styled-components'

import Background from "../images/image2.png"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mobile } from '../responsive'


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background:linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Background}) center;
    background-size: cover;
    background-attachment: fixed;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 80%;
    padding: 20px;
    background-color: white;
    ${mobile({width:"50%"})};
`

const Title = styled.h1`
    font-size: 24px;
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
                <Title>About Us</Title>
                <Form>
                    <Description>
                    <b>Pictures here</b>
                    I used to have trouble shopping second hand because I was stuck 
                    in a belief that it was strange to wear someone else's clothes 
                    and more prominently - that if I didn't have new styles, I wouldn't 
                    fit in. Maybe you were like me OR are still thinking this... But who 
                    taught us that? With some reflection, it seems like these ideas have 
                    to come from somewhere like major marketing within the fast fashion 
                    industry. We are told through campaigns that we consistently need 
                    more trendy items and that this consumption is normal because individual 
                    pieces are cheap. But it's come to light that this is not sustainable for
                     our wallets, closets, environment and human life.So enters a new perspective 
                     and awareness on shopping second hand. A choice that we are able to make 
                     towards purchasing clothing that's been produced and no longer worn by the 
                     original owner. This style of clothing can come in a variety of forms - 
                     consignment, vintage, thrift, hand-me-downs, swapping clothes with friends. 
                     Based on Fashion Revolution mag, it provides an opportunity to "recreate 
                     your favorite looks for a fraction of the price by buying from local charity
                      shops. This keeps perfectly good clothes out of landfill and supports charitable
                       causes too. Win-win!" And win-win it is — shopping second hand can do so much 
                       for our wardrobes and wallets. So here are 4 reasons shopping second hand just
                        makes sense! <b></b>
                    </Description>
                </Form>
            </Wrapper>
        </Container>
        <Footer/>
        </div>
    )
}

export default About