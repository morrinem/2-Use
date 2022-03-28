import React from 'react'
import styled from 'styled-components'

import { popularProducts } from '../data'
import Product from './Product'

const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`
const InfoContaiiner = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`

const Products = () => {
    return (
        <Container>
            {popularProducts.map(item=>(
                <Product item={item} key={item.id} />
            ))}
        </Container>
    )
}

export default Products