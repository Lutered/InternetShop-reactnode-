import React from 'react';

import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

import './additionalComp.css';

function Rating({rating, style, size = 16}) {
    const starsArray = [];

    for(let i = 1; i <= 5; i++){
        starsArray.push(i);
    }

    rating = rating ?? 0;

    return ( 
       <div style = {style}>
            {starsArray.map(i => {
                if(rating >= i) return <StarFill key={i} size={size} className='star'></StarFill>;
                if((rating - 0.5) >= i) return <StarHalf size={size} className='star'></StarHalf>;

                return <Star key={i} size={size} className='star'></Star>;
            })}
       </div>
    );
}

export default Rating;