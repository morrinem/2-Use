// Michael
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {Search, ShoppingCartOutlined} from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import { Link } from "react-router-dom"

import { LoginContext } from '../Helper/Context'


import {mobile} from '../responsive'

const Container = styled.div`
    height: 65px;
    ${mobile({height:"50px"})};
`

const Wrapper = styled.div`
    padding: 5px 10px;
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
    border: 2px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 10px;
    padding: 0px;
    border-radius: 30px;
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

const Logo = styled.button`
    font-weight: bold;
    font-size: 35px;
    border: none;
    background-color: transparent;
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
    padding: 5px;
    font-size: 18px;
    background-color: transparent;
    cursor: pointer;
    margin: 10px;
    border-radius: 30px;
    &:hover{
        background-color: #ced4c5;
        transform: scale(1.2);
    }
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({height:"20vh"})};
`


//badgecontent is the amount of items in the cart
//we'll modify this when we get products up and running
const Navbar = () => {
    
    const { loggedIn, setLoggedIn } = useContext(LoginContext)
    console.log("hellllloooooo")
    console.log(loggedIn.hasToken)

    const logOut = () => {
        localStorage.setItem("token", "")
        setLoggedIn({
            hasToken: false,
            userId: undefined
        })
    }
    
    
    return (
      <Container>
        <Wrapper>
          <Left>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to="/">
              <Logo type="button" className="btn btn-info">
                2USE
              </Logo>
            </Link>
          </Center>
            {
                loggedIn.hasToken ? (
                    <Right>
                        <Link to="/Posts">
                            <Button type="button" className="btn btn-info">
                                Posts
                            </Button>
                        </Link>
                        <Link to="/CreatePosts">
                            <Button type="button" className="btn btn-info">
                                Create Post
                            </Button>
                        </Link>
                        <Link to="/Profile">
                            <Button type="button" className="btn btn-info">
                                Profile
                            </Button>
                        </Link>
                            <Button onClick={logOut}>
                                Log out
                            </Button>
                        <MenuItem>
                            <Badge badgeContent={0} color="primary">
                                <Link to="/Product">
                                    <ShoppingCartOutlined />
                                </Link>
                            </Badge>
                        </MenuItem>
                    </Right>
                ) : (
                    <Right>

                        <Link to="/Register">
                            <Button type="button" className="btn btn-info">
                                REGISTER
                            </Button>
                        </Link>
                        <Link to="/Login">
                            <Button type="button" className="btn btn-info">
                                LOGIN
                            </Button>
                        </Link>
                        <Link to="/About">
                            <Button type="button" className="btn btn-info">ABOUT US</Button>
                            </Link>
                        <MenuItem>
                            <Badge badgeContent={0} color="primary">
                                <Link to="/Product">
                                    <ShoppingCartOutlined />
                                </Link>
                            </Badge>
                        </MenuItem>
                    </Right>
                )
            }
          
        </Wrapper>
      </Container>
    );
}

export default Navbar
