// Michael
import React from 'react'
import styled from 'styled-components'
import {Search, ShoppingCartOutlined} from '@material-ui/icons'
import { Badge } from '@material-ui/core'
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

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: px;
`

const Input = styled.input`
    border:none;
    :focus{
        outline: none;
    };
    ${mobile({width:"50px"})};

`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize:"24px"})};
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex:"2",justifyContent:"center"})};
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize:"12px",marginLeft:"10px"})};
`
const Button = styled.button`
    padding: 0px;
    font-size: 20px;
    background-color: teal;
    cursor: pointer;
`

//badgecontent is the amount of items in the cart
//we'll modify this when we get products up and running
const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <Search style={{color:"gray",fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>2USE.</Logo>
                </Center>
                <Right>
                    <Link to="/loginregister">
                    <Button type="button" className="btn btn-info">LOGIN/REGISTER</Button>
                    </Link>
                    <MenuItem>
                        <Badge badgeContent={0} color="primary">
                            <Link to="/loginregister"></Link>
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
