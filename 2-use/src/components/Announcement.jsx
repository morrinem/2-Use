import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = () => {
    return (
        <Container>
            2use is strictly for Trinity College Dublin students, please sign in to purchase and interact with products
        </Container>
    )
}

export default Announcement
