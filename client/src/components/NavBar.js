import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useSearchParams, useLocation  } from 'react-router-dom';

import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';
import { List, Cart3, Person, X } from 'react-bootstrap-icons';

import { observer } from "mobx-react-lite";

import BasketModal from './modals/BasketModal';
import BasketHelper from '../helpers/BasketHelper';

import { HOME_ROUTE } from '../utils/consts';
import { SEARCH_ROUTE } from "../utils/consts";
import globalStores from '../globalStores';

import '../styles/navbar.css';

const buttonsSize = 28;

const NavBar = observer(() => {
    const navigate = useNavigate();

    const basketStore = globalStores.getBasketStore();

    const [searchParams] = useSearchParams();
    const urlSearchValue = searchParams.get('search');

    const [searchValue, setSearchValue] = useState('');
    const [showBasket, setShowBasket] = useState(false);

    let location = useLocation();

    const onChangeSearchTF = (e) => { 
        setSearchValue(e.target.value); 
    };
    const onKeyDownSearchTF = (e) => { 
        if (e.key === "Enter") { 
            searchFn();
        }
    };

    const searchFn = () =>{
        let searchUrl = SEARCH_ROUTE;

        if(searchValue !== '') searchUrl = `${searchUrl}?search=${searchValue}`;

        navigate(searchUrl);
    };

    useEffect(() => {
        if(location.pathname === SEARCH_ROUTE)
            setSearchValue(urlSearchValue ?? '');

        BasketHelper.updateBasketItemsCount();
    }, [urlSearchValue, location]);

    return (
        <Navbar bg="dark" className="bg-body-tertiary "> 
                <BasketModal />

                <Button variant="outline-light" className='navbuttons'>
                    <List color="white" size={30}/>
                </Button>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href={HOME_ROUTE} className='navbrand'>Direct</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='navsearch'>
                        <input 
                            type="text" 
                            className='navsearchfield' 
                            value={searchValue} 
                            onChange={onChangeSearchTF} 
                            onKeyDown={onKeyDownSearchTF}/>     
                        <Button variant="success" className='navsearchbutton' onClick={searchFn}>Найти</Button>
                    </div>
                   
                </Navbar.Collapse>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <div className='navbuttonssection'>
                    <Button variant="outline-light" className='navbuttons navBasket' onClick={BasketHelper.showBasketWnd}>
                        <Cart3 color="white" size={buttonsSize}/> 
                        {
                            basketStore.basketCount > 0 ? 
                            <div className='navBasketCount'>{basketStore.basketCount}</div> 
                            : null
                        }
                        
                    </Button>
                    <Button variant="outline-light" className='navbuttons'>
                        <Person color="white" size={buttonsSize}/>
                    </Button>
                </div>
        </Navbar>
    )
})

export default NavBar;