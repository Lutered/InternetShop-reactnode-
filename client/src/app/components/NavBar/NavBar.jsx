import React, {useEffect, useState} from 'react';
import { useNavigate, useSearchParams, useLocation  } from 'react-router-dom';

import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';
import { List, Cart3, Person} from 'react-bootstrap-icons';

import { observer } from "mobx-react-lite";

import { HOME_ROUTE, SEARCH_ROUTE } from '../../router/routeConsts';
import globalServices from '../../../services/globalServices';

import './navbar.css';

const buttonsSize = 28;

const NavBar = observer(() => {
    //#region variables
    const basketService = globalServices.getBasketServices();

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const urlSearchValue = searchParams.get('search');

    const [searchValue, setSearchValue] = useState('');
    //#endregion

    //#region functions
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
    //#endregion

    useEffect(() => {
        if(location.pathname === SEARCH_ROUTE)
            setSearchValue(urlSearchValue ?? '');

    }, [urlSearchValue, location]);

    return (
        <Navbar bg="dark" className="bg-body-tertiary "> 
                {/* <BasketModal /> */}

                <Button variant="outline-light" className='nav-buttons'>
                    <List color="white" size={30}/>
                </Button>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href={HOME_ROUTE} className='nav-brand'>Direct</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='nav-search'>
                        <input 
                            type="text" 
                            className='nav-searchfield' 
                            value={searchValue} 
                            onChange={onChangeSearchTF} 
                            onKeyDown={onKeyDownSearchTF}/>     
                        <Button variant="success" className='nav-searchbutton' onClick={searchFn}>Найти</Button>
                    </div>
                   
                </Navbar.Collapse>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <div className='d-flex'>
                    <Button variant="outline-light" className='nav-buttons nav-basket' onClick={() => {basketService.showBasketWnd()}}>
                        <Cart3 color="white" size={buttonsSize}/> 
                        {
                            basketService.getBasketCount() > 0 ? 
                            <div className='nav-basketCount'>{basketService.getBasketCount()}</div> 
                            : null
                        }
                        
                    </Button>
                    <Button variant="outline-light" className='nav-buttons'>
                        <Person color="white" size={buttonsSize}/>
                    </Button>
                </div>
        </Navbar>
    )
})

export default NavBar;