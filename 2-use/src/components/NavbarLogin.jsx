// Michael
import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import {mobile} from '../responsive'

const Container = styled.div`
    height: 60px;
    ${mobile({height:"50px"})};
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding:"10px 0px"})};
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.button`
    font-weight: bold;
    ${mobile({fontSize:"24px"})};
    border: none;
    background-color: transparent;
    font-size: 35px;
`

//badgecontent is the amount of items in the cart
//we'll modify this when we get products up and running
const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Center>
                    <Link to="/">
                        <Logo type="button" className="btn btn-info">
                            2USE
                        </Logo>
                    </Link>
                </Center>
            </Wrapper>
        </Container>
    )
}

export default Navbar
