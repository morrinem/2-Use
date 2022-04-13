import React from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import { mobile } from '../responsive'
import { Link } from "react-router-dom"




const Container = styled.div`
    width: 100%;
    height: 80vh;
    overflow: hidden;
`


const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #white;
    text-align: center;
`

const ImgContainer = styled.div`
    flex: 1;
    height: 150%;
    
`

const Image = styled.img`
    height: 100%;
`




const Slider = () => {
    
    return (
        <Container>
                {sliderItems.map((item)=>(
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img}/>
                        </ImgContainer>
                    </Slide>
                ))}
        </Container>
    )
}

export default Slider
