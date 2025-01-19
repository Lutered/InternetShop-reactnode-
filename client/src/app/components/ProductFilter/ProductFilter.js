import React, { Component } from 'react';


const ProductFilter = ({children}) => {
    return (
        <div className='sidebar'>
            {children}
        </div>
    );
}

export default ProductFilter;
