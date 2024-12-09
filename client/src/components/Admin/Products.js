import React from 'react';
import ProductCards from '../ProductCards';

function Products() {
    const cards = [
        {Title: 'Test title 1', Text: 'Test text 1'},
        {Title: 'Test title 2', Text: 'Test text 2'}
    ];

    return (  
        <>
            <ProductCards elements = {cards}></ProductCards>
        </> 
    );
}

export default Products;