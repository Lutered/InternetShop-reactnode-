import { useEffect, useState, useCallback } from 'react';

import Form from 'react-bootstrap/Form';
import { ChevronUp } from 'react-bootstrap-icons';

import Button from 'react-bootstrap/Button';

import './productFilter.css';

import globalServices from '../../../services/globalServices';

const productService = globalServices.getProductService();

const ExpandedGroup = ({children, label, isExpanded, setExpanded}) => {
    const expandIconSize = 16;
    const defaulLabelColor = '#3e3d3d'; 
    const hoverLabelColor = '#1a0fdb';

    const [labelColor, setLabelColor] = useState(defaulLabelColor);

    const expandElementClassName = 'filter-expand-element ' + 
        (isExpanded ? 'filter-expand-expanded' : 'filter-expand-collapsed');

    const iconContainerClassName = 'filter-expand-icon-container ' + 
        (isExpanded ? 'filter-expand-icon-container-expanded' : '');

    return (
        <div className='filter-expand-group'>
            <div 
                className='filter-expand-label'
                onClick={() => setExpanded(!isExpanded)}
                onMouseEnter={() => {console.log('in'); setLabelColor(hoverLabelColor)}}
                onMouseLeave={() => {console.log('out'); setLabelColor(defaulLabelColor)}}
                style={{color: labelColor}}
            >
                    <span>{label}</span>
                    <div className={iconContainerClassName}>
                            <ChevronUp 
                                size={expandIconSize} 
                                color={labelColor} 
                            />
                    </div>
            </div>
            <div className='filter-expand-wrapper'>
                <div className={expandElementClassName}>
                    <div className='filter-expand-child-container'>
                    {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilterOptions = ({itemId, values, updateValuesFn}) => {
    const [options, setOptions] = useState([]);
   
    useEffect(() => {
        productService.getFilterOptions(itemId).then((data) => {
            setOptions(data);
        });
    }, []);

    return (
        <div>
            {options.map((rec, key) => {
                return (
                    <Form.Check 
                            key={key}
                            type='checkbox'
                            label={rec.label}
                            checked={values.indexOf(rec.code) > -1}
                            onChange={() => {
                                let index = values.indexOf(rec.code);

                                if(index > -1) updateValuesFn(values.filter(x => x !== rec.code))
                                else updateValuesFn([...values, rec.code]);
                            }}
                    />
                )}
            )}
        </div>
    );
}

const FilterNumber = ({values, updateValue, config}) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '5px'
        }}>
            <Form.Control
                type='number'
                value={values?.minValue}
                onChange={(e)=>{updateValue('min', e.target.value)}}
            />
            <span style={{margin: '0 5px'}}>-</span>
            <Form.Control
                type='number'
                value={values?.maxValue}
                onChange={(e)=>{updateValue('max', e.target.value)}}
            />
        </div>
    );
} 

export default function ProductFilter({itemsConfig, filters, onFilter}){
    const [items, setItems] = useState([]);

    useEffect(() => {
        let initItems = [];

        for(let rec of itemsConfig){
            let initItem = {
                id: rec.id,
                code: rec.code,
                type: rec.type,
                label: rec.label,
                expanded: true
            };

            let filter = filters[rec.code];
            switch(rec.type){
                case 'option':
                    initItem.values = filter ? 
                        filter.split(',') : 
                        [];

                    break;
                case 'number': 
                    initItem.values = {};
                    initItem.values.minValue = filter ? filter.split('-')[0] : 0; 
                    initItem.values.maxValue = filter ? filter.split('-')[1] : 9999;
                    break;
                default: 
                    break;
            }

            initItems.push(initItem);
        }

        setItems(initItems);
    }, [itemsConfig, filters]);

    const updateNumValueFn = useCallback((index) => {
        return (field, value) => {
            let newItems = [...items];
            let item = newItems[index];
    
            if(field === 'min')
                item.values.minValue = value;
            else
                item.values.maxValue = value;   
            
            setItems(newItems);
        }
    }, [items]);

    return(
        <div className='filter-container'>
            <div className='filter-items-container'>
                {items.map((rec, index) => {    
                    let item = null;
                    switch(rec.type){
                        case 'option':
                            item = <FilterOptions 
                                        itemId={rec.id} 
                                        values={rec.values}
                                        updateValuesFn={(array) => { 
                                            let newItems = [...items];
                                            let item = newItems[index];
                                            
                                            item.values = array;

                                            setItems(newItems);
                                        }}/>
                            break; 
                        case 'number':
                            item =  <FilterNumber 
                                        values={rec.values}
                                        updateValue={updateNumValueFn(index)}
                                    />;
                            break;
                        default:
                            break;
                    }

                    return (
                        <ExpandedGroup 
                            label={rec.label}
                            key={index}
                            isExpanded={rec.expanded} 
                            setExpanded={(val) => {
                                let newItems = [...items];
                                let item = newItems[index];

                                item.expanded = val;

                                setItems(newItems);
                            }}
                        >
                            {item} 
                        </ExpandedGroup>
                    );}
                )}
            </div>
            <div style={{height: 'auto', display: 'flex'}}>
                <Button 
                    style = {{flex: '1', margin: '5px 2px'}}
                    variant="success"
                    onClick={()=>{
                        let filterStr = '';

                        if(filterStr !== '') filterStr += ';';

                        for(let item of items){
                            switch(item.type){
                                case 'option':
                                    if(!item.values || item.values.length === 0) continue;

                                    filterStr += `${item.code}=${item.values.join(',')}`;
                                    break;
                                case 'number':
                                    if(item.values) continue;

                                    filterStr += `${item.code}=${item.values.minValue}-${item.values.maxValue}`;
                                    break;
                                default:
                                    break;
                            }
                        }

                        onFilter(filterStr);
                    }}
                >
                    Найти
                </Button>
            </div>
        </div>
    );
}