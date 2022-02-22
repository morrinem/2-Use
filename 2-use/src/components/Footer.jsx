import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

import ImagePayement from '../images/payement.png'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection:"column"})};
`
// left footer
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1``

const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    color: white;
    border-radius: 50%;
    margin-right: 20px;
    background-color: #${props=>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`


// center footer
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display:"none"})};
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
`

// right footer
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({backgroundColor:"#fff8f8"})};
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payement = styled.img`
    width: 50%;
`


const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>2USE.</Logo>
                <Desc>
                    
                </Desc>
                <SocialContainer>
                    <SocialIcon color='3B5999'>
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <Instagram onClick={event => window.open('https://www.instagram.com/2use_platform/?hl=en')} />
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <Twitter />
                    </SocialIcon>
                </SocialContainer>
            </Left>

            <Center>
                <Title>Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>

            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{marginRight:"10px"}} />
                    1 Grafton Street, Dublin 2, Co. Dublin
                </ContactItem>

                <ContactItem>
                    <Phone style={{marginRight:"10px"}} />
                    0831234567
                </ContactItem>

                <ContactItem>
                    <MailOutline style={{marginRight:"10px"}} />
                    contact@2use.com
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer
