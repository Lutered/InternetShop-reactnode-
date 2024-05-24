import React from 'react';
import Cards from '../Cards';

function Products() {
    const cards = [
        {Title: 'Test title 1', Text: 'Test text 1'},
        {Title: 'Test title 2', Text: 'Test text 2'}
    ];

    return (  
        <>
            <Cards elements = {cards}></Cards>
        </> 
    );
}

export default Products;