// Michael
import React from 'react'
import styled from 'styled-components'

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

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize:"24px"})};
`

//badgecontent is the amount of items in the cart
//we'll modify this when we get products up and running
const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Center>
                    <Logo>2USE.</Logo>
                </Center>
            </Wrapper>
        </Container>
    )
}

export default Navbar
