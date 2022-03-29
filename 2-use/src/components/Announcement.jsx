import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    height: 30px;
    background-color: #ced4c5;
    color: teal;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = () => {
    return (
        <Container>
            2use is for Trinity College Dublin students, please sign in to purchase. Other colleges coming soon.
        </Container>
    )
}

export default Announcement
