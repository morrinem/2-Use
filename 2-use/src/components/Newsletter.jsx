import { Send } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    height: 40vh;
    background-color:#ced4c5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`

const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({textAlign:"center"})};
`

const InputContainer = styled.div`
    width: 30%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({width:"80%"})};
`

const Input = styled.input`
    padding: 0px;
    border: none;
    flex: 8;
    padding-left: 20px;
`

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: #ced4c5;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: teal;
        transform: scale(1.5);
    }
`

const Newsletter = () => {
    return (
        <Container>
            <Title>Stay in the know</Title>
            <Desc>Sign up for our newsletter to get the latest updates.</Desc>
            <InputContainer>
                <Input placeholder='Your email'/>
                <Button>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter
