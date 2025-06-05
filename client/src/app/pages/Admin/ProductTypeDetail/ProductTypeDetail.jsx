import {useMemo, useState} from 'react';
import { useLocation } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Plus, Trash} from 'react-bootstrap-icons';

import globalServices from '../../../../services/globalServices';

import './productTypeDetail.css';

const rowGap = '30px';
const optionsTypeMap = new Map([
    ['options', 'Опции'],
    ['number', 'Число']
]);

const RemoveIcon = ({onClick, size = 16}) => {
    return (
        <Trash 
            size={size}
            style={{cursor: 'pointer'}}
            color='red' 
            onClick={(e) => { 
                onClick(e)
            }}
        />
    );
};

const FiltersTable = ({filters, removeFilter}) => {
    const trashColumnWidth = '100px';
    return (
        <Table striped bordered hover>
            <thead className='scroll-table-head'>
                <tr>
                    <th>Имя</th>
                    <th>Тип</th>
                    <th>Дополнительные данные</th>
                    <th style={{width: trashColumnWidth}}></th>
                </tr>
            </thead>
            <tbody className='scroll-table-body' style={{height: '150px'}}>
                {filters.map((val, index) => 
                        <tr key={index} className='scroll-table-row'>
                            <td>{val.name}</td>
                            <td>{optionsTypeMap.get(val.type)}</td>
                            <td></td>
                            <td style={{
                                width: trashColumnWidth,
                                textAlign: 'center'
                            }}>
                                {/* <div style={{
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    height: '20px', 
                                    alignItems: 'center',
                                }}> */}
                                    <RemoveIcon 
                                        size={18}
                                        onClick={(e) => { 
                                            removeFilter(val)
                                        }}
                                    />
                                {/* </div> */}
                            </td>
                        </tr>
                )}
            </tbody>
        </Table>
    );
};

const TypesCreate = () => {
    const productService = globalServices.getProductService();

    const location = useLocation();

    const mode = useMemo(() => 
        location.pathname.endsWith('create_type') ? 'create' : 'modify', 
    [location]);

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        icon: null,
        filters: []
    });

    const [filterData, setFilterData] = useState({
        name: '',
        type: 'options',
        inputOption: '',
        options: [],
        min: null,
        max: null
    });

    const createType = (event) => {
        
        console.log('test');
        event.preventDefault();
        event.stopPropagation();
    };

    return ( 
        <>
            <div className='type-detail-header'>
                <div className='type-detail-header-wrapper'>
                    <Button variant='success' className='type-detail-button' onClick={createType}>Создать</Button>
                    <Button variant='danger' className='type-detail-button'>Отмена</Button>
                </div>        
            </div>
            <div className='main-container'>
                <div className='main-content-container type-detail-container'> 
                    <h3 className='type-detail-title'>
                        {mode === 'create' ? 
                            'Создать тип' : 
                            'Изменить тип'
                        } 
                    </h3>
                    <Form className='type-detail-form' id='product-type-form'>
                        <Form.Group style={{flex: '1'}}>
                            <Form.Label>Название</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Название"
                                value={formData.name}
                                onChange={(e) => {setFormData({...formData, name: e.target.value});}}
                            />
                        </Form.Group>
                        <div className='d-flex' style={{gap: rowGap}}>
                            <Form.Group style={{flex: '1'}}>
                                <Form.Label>Код</Form.Label>
                                <Form.Control 
                                    required
                                    type="text" 
                                    placeholder="Код" 
                                    value={formData.code}
                                    onChange={(e) => {setFormData({...formData, code: e.target.value});}}
                                />
                            </Form.Group>

                            <Form.Group style={{flex: '1'}}>
                                <Form.Label>Иконка</Form.Label>
                                <Form.Control 
                                   type='file'
                                   onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        icon: e.target.files[0]
                                    });

                                    // let reader = new FileReader();
                                    // reader.onload = function() {
                                    //     setFormData({
                                    //         ...formData,
                                    //         icon: e.target.files[0]
                                    //     });
                                    // }
                                    // reader.readAsArrayBuffer(e.target.files[0]);
                                   }}
                                />
                            </Form.Group>
                        </div>

                        <div>
                            <p className='type-detail-filter-header'>Фильтры</p>
                            <div className='type-detail-filter-group'>
                                <div className='type-detail-filter-input-container' style={{gap: rowGap}}>
                                    <div className='type-detail-filter-input-column justify-content-between'>
                                        <div>
                                            <Form.Group style={{marginBottom: '5px'}}>
                                                <Form.Label>Название</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Название"
                                                    value={filterData.name}
                                                    onChange={(e) => {setFilterData({...filterData, name: e.target.value});}}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Тип</Form.Label>
                                                <Form.Select
                                                    value={filterData.type}
                                                    onChange={(e)=>{setFilterData({...filterData, type: e.target.value});}}
                                                >
                                                    {['options', 'number'].map((code, index) => 
                                                        <option key={index} value={code}>{optionsTypeMap.get(code)}</option>
                                                    )}
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                        <Button 
                                            variant="success" 
                                            onClick={(e) => {
                                                const newFilter = {
                                                    name: filterData.name,
                                                    type: filterData.type
                                                }; 
                                                setFormData({
                                                    ...formData, 
                                                    filters: [...formData.filters, newFilter]
                                                }); 
                                                setFilterData({
                                                    name: '',
                                                    type: 'options',
                                                    inputOption: '',
                                                    options: [],
                                                    min: null,
                                                    max: null
                                                });
                                            }}
                                        >
                                            Добавить
                                        </Button>
                                    </div>
                                    <div className='type-detail-filter-input-column'>
                                        {filterData.type === 'options' ? 
                                            <>
                                                <Form.Group style={{flex:1, marginBottom: '5px'}}>
                                                    <Form.Label>Опции</Form.Label>
                                                    <div style={{display: 'flex', gap: '6px'}}>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Опция" 
                                                            value={filterData.inputOption}
                                                            onChange={(e) => {setFilterData({...filterData, inputOption: e.target.value})}}
                                                        />
                                                        <Button 
                                                            style={{padding:'5px'}}
                                                            variant="success" 
                                                            size="sm" 
                                                            onClick={() => {
                                                                const newOption = [...filterData.options, filterData.inputOption];
                                                                setFilterData({
                                                                    ...filterData, 
                                                                    options: newOption, 
                                                                    inputOption: ''
                                                                });
                                                            }}
                                                        >
                                                            <Plus size='24'/>
                                                        </Button>
                                                    </div>
                                                </Form.Group>
                                                
                                                <ListGroup className='type-detail-list-group' style={{height: '100%'}}>
                                                    {filterData.options.map((val, index) => 
                                                        <ListGroup.Item key={index} className='d-flex justify-content-between align-items-center'>
                                                            <span>{val}</span>
                                                            <RemoveIcon 
                                                                onClick={(e) => { 
                                                                    setFilterData({
                                                                        ...filterData, 
                                                                        options: filterData.options.filter(x => x !== val)
                                                                    }); 
                                                                }}
                                                            />
                                                        </ListGroup.Item>
                                                    )}               
                                                </ListGroup>
                                            </> : null
                                        }   
                                        {filterData.type === 'number' ? 
                                            <>
                                                <Form.Group style={{marginBottom: '5px'}}>
                                                    <Form.Label>Минимальное значение</Form.Label>
                                                    <Form.Control 
                                                        type="number" 
                                                        placeholder="Минимальное значение" 
                                                        value={filterData.min}
                                                        onChange={(e) => {setFilterData({...filterData, min: e.target.value})}}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Максимальное значение</Form.Label>
                                                    <Form.Control 
                                                        type="number" 
                                                        placeholder="Максимальное значение" 
                                                        value={filterData.max}
                                                        onChange={(e) => {setFilterData({...filterData, max: e.target.value})}}
                                                    />
                                                </Form.Group>
                                            </> : null

                                        }
                                    </div>
                                </div>
                                <div >
                                    <FiltersTable 
                                        filters={formData.filters} 
                                        removeFilter={(val) => {
                                            setFormData({
                                                ...formData, 
                                                options: formData.filters.filter(x => x !== val)
                                            }); 
                                        }
                                    }/>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
       </>
    );
}

export default TypesCreate;