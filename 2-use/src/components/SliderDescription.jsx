import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from "react-router-dom"




const Container = styled.div`
    height: 50vh;
    background-color: transparent;
`

const InfoContaiiner = styled.div`
    text-align: center;
`

const Title = styled.h1`
    font-size: 70px;
    left: 50%;
`

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const Button = styled.button`
    padding: 10px;
    font-size: 40px;
    background-color: transparent;
    cursor: pointer;
    border-color: teal;
    margin: 10px;
    border-radius: 30px;
    &:hover{
        background-color: #ced4c5;
        transform: scale(1.2);
    }

`
const Slider = () => {
    
    return (
        <Container>
            <InfoContaiiner>
                <Title>Who are we?</Title>
                <Desc> Do your bit to help make the world a more renewable place </Desc>
                <Link to="/ProductList">
                    <Button type="button" className="btn btn-info">BUY</Button>
                </Link>
                <Link to="/Post/:id">
                    <Button type="button" className="btn btn-info">SELL</Button>
                </Link>
                </InfoContaiiner>
        </Container>
    )
}

export default Slider
