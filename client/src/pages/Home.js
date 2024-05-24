import React from 'react';
import Container from 'react-bootstrap/Container';
import Sidebar from '../components/Sidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Carousel from 'react-bootstrap/Carousel';
import carousel1 from '../static/images/carousel01.jpg';
import carousel2 from '../static/images/carousel02.jpg';
import '../styles/page.css';
import Cards from '../components/Cards';

const carouselImg = [
    {src: carousel1, alt: 'First slide', title: 'First slide label', text: 'Nulla vitae elit libero, a pharetra augue mollis interdum'},
    {src: carousel2, alt: 'Second slide', title: 'Second slide label', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
];

// const sidebarItemsArray = [
//     "Ноутбуки и компютеры",
//     "Бытовая техника",
//     "Телевизоры",
//     "Телефоны"
// ];

const sidebarItemsArray = [
    { text: "Sidebar Item 1", action: () => {} },
    { text: "Sidebar Item 2", action: () => {} },    
    { text: "Sidebar Item 3", action: () => {} },    
    { text: "Sidebar Item 4", action: () => {} },
    { text: "Sidebar Item 5", action: () => {} }
];

const cards = [
    {Title: 'Test title 1', Text: 'Test text 1'},
    {Title: 'Test title 2', Text: 'Test text 2'}
];

const HomePage = () => {
    return (
       <Container className='maincontainer' >
            <Row>
                <Col xs={3}> 
                    <Sidebar sidebarArray={sidebarItemsArray}/>
                </Col>
                <Col  xs={9}>
                    {/* <Carousel data-bs-theme="dark">
                        {carouselImg.map((item, index) =>
                             <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={item.src}
                                    alt={item.alt}
                                />
                                <Carousel.Caption>
                                <h5>{item.title}</h5>
                                <p>{item.text}</p>
                                </Carousel.Caption>
                            </Carousel.Item> 
                        )}
                    </Carousel> */}
                    <Cards elements = {cards}>

                    </Cards>
                    
                </Col>
            </Row>
       </Container>
    )
}

export default HomePage;