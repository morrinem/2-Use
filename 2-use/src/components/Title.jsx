import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    height: 30px;
    background-color: white;
    color: dark-green;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 500;
`

const Announcement = () => {
    return (
        <Container>
            Popular Items
        </Container>
    )
}

export default Announcement
