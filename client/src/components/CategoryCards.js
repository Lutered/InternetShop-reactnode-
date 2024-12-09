import React from 'react';
import Card from 'react-bootstrap/Card';
import '../styles/cards.css';

const CategoryCards = ({elements, clickFn}) => {
    return ( 
        <div>
            {elements.map((val, index) => 
              <Card className='typeCard' key ={index} onClick={() => { clickFn && clickFn(val.id); }}>
                <div className='card-img-wrapper'>
                  <Card.Img variant="top" src={val.Img ?? ''}/>
                </div>
                <Card.Body>
                  <Card.Title>{val.Title}</Card.Title>
                  <Card.Text> {val.Text} </Card.Text>
                </Card.Body>
             </Card>
            )}
        </div> 
    );
}

export default CategoryCards;