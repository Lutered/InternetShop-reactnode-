import React, {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import { HOME_ROUTE } from '../utils/consts';
import { List, Cart3, Person } from 'react-bootstrap-icons';
import '../styles/navbar.css';

const buttonsSize = 28;

const NavBar = () => {
    return (
        <Navbar bg="dark" className="bg-body-tertiary "> 
            <Container className='maincontainer'>
                <Button variant="outline-light" className='navbuttons'>
                    <List color="white" size={30}/>
                </Button>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href={HOME_ROUTE} style={{color:'white', margin:'10px'}}>Site Brand</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='navsearch'>
                        <input type="text"  className='navsearchfield' />     
                        <Button variant="success" className='navsearchbutton'>Найти</Button>
                    </div>
                   
                </Navbar.Collapse>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <div className='navbuttonssection'>
                    <Button variant="outline-light" className='navbuttons'>
                        <Cart3 color="white" size={buttonsSize}/>    
                    </Button>
                    <Button variant="outline-light" className='navbuttons'>
                        <Person color="white" size={buttonsSize}/>
                    </Button>
                </div>
            </Container>
        </Navbar>
    )
}

export default NavBar;