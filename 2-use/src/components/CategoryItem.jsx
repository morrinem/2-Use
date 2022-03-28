import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from "react-router-dom"

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
    ${mobile({height:"20vh"})};
`

const Button = styled.button`
    border-color: teal;
    padding: 10px;
    background-color: white;
    font-size: 18px;
    color: teal;
    cursor: pointer;
    font-weight: 600;
    border-radius: 30px;
    &:hover{
        background-color: white;
        transform: scale(1.2);
    }
`


const CategoryItem = ({item}) => {
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title> {item.title} </Title>
                <Link to="/ProductList">
                    <Button> SHOP NOW</Button>
                </Link>
            </Info>
        </Container>
    )
}

export default CategoryItem