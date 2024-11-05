import {useState, useEffect} from 'react';

import '../styles/page.css';

import Cards from '../components/Cards';

import { fetchProductTypes, fetchProducts } from '../http/productApi';

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

//import Pagination from 'react-bootstrap/Pagination';
import PaginationPanel from '../components/Pagination'

const carouselImg = [
    {src: carousel1, alt: 'First slide', title: 'First slide label', text: 'Nulla vitae elit libero, a pharetra augue mollis interdum'},
    {src: carousel2, alt: 'Second slide', title: 'Second slide label', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
];

const HomePage = () => {
    const [sidebarItemsArray, setSidebarItems] = useState([]);
    const [cardsArray, setCards] = useState([]);
    const [currentPage, setPage] = useState(1);
    const [numberOfPages, setTotalPages] = useState(1);
    //const [cards, setCards] = useState([]);

    const pageLimit = 5;

    const requestProducts = (typeId, brandId, page, limit) => {
        fetchProducts(typeId, brandId, page, limit).then(data => {
            const array = data.rows.map(val => {
                return {
                    id: val.id,
                    Title: val.name,
                    Text: val.description,
                    Img: process.env.REACT_APP_API_URL + '/photos/' + val.img
                };
            });
            setCards(array);

            let totalPages = Math.ceil(data.count/pageLimit);
            if(totalPages === 0) totalPages = 1;
            setTotalPages(totalPages); 
        });
    };

    const paginationClickFn = (pageNumber) => {
        setPage(pageNumber);
        requestProducts(null, null, pageNumber, pageLimit);
    };

    useEffect(() => {
        fetchProductTypes().then(data => {
            const array = data.rows.map(val => {
                return {
                    text: val.name,
                    action: () => {}
                };
            });
            setSidebarItems(array);
        });

        requestProducts(null, null, 1, pageLimit);
    }, []);

    return (
       <Container className='maincontainer'>
            <div style={{marginTop: '50px'}}>
                <h3>Популярные категории</h3>
            </div>
       </Container>
    )
}

export default HomePage;