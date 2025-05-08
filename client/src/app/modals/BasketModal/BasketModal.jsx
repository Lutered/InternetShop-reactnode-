import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Plus, Dash } from 'react-bootstrap-icons';

import { observer } from 'mobx-react-lite';

import { Trash3 } from 'react-bootstrap-icons';

import CurrencyIcons from "../../additionalComponents/CurrencyIcons";

import globalServices from '../../../services/globalServices';

import './basketModal.css';


const BasketModal = observer(({ onHide }) => {
    const quantityBtnSize = 30;
    const quantityBtnClass = 'basketItem-quantity-buttons';

    const basketService = globalServices.getBasketService();
    const modalService = globalServices.getModalService();

    const isShowed = modalService.isModalShowed('basket');

    const closeFn = () =>{
        //basketService.hideBasketWnd();
        modalService.hide('basket');

        onHide && onHide();
    };

    const onChangeQuantity = (id, count) => { 
        basketService.updateBasketItem(id, {count});
    };

    const saveQuantity = (id, count) => {
        const basketItem = basketService.getBasketList().find(item => item.id == id);

        if(!basketItem) throw 'Basket Item was not found';

        if(count != basketItem.serverCount)
            basketService.changeItemCount(id, count);
    };

    const removeItem = (id) => {
        basketService.removeProductFromBasket(id, {updateItems: true});
    }

    const getSumPrice = (price, count) => {
        return price * count;
    };

    useEffect(() => {
        if(isShowed) 
            basketService.updateBasketItems();
    }, [isShowed]);

    return (  
        <Modal className="basket" show={isShowed} onHide={closeFn}>
            <Modal.Header closeButton>
                <Modal.Title>Корзина</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {basketService.getBasketList().map((val, index) => 
                    <div key={index} className='basketItem'>
                        <div className='d-flex'>
                            <div>
                                <img src={val.img} className='basketItem-body-img'/>
                            </div>
                            <div className='basketItem-body-text-container'>
                                <p className='basketItem-body-text'>{val.name}</p>
                            </div>
                            <div>
                                <Button variant="outline-light" onClick={(e) => { removeItem(val.id)}}>
                                    <Trash3 color='red' size={16}/>
                               </Button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <div className='d-flex align-items-center'>
                                <Dash 
                                      size={quantityBtnSize} 
                                      className={val.count <= 1 ? 
                                      `${quantityBtnClass} disabledIconStyle` 
                                      : quantityBtnClass}
                                      onClick={(e) => { if(val.count > 1) saveQuantity(val.id, val.count - 1);}}
                                      />
                                <input 
                                    type='text' 
                                    className='basketItem-quantity-input' 
                                    value={val.count} 
                                    onChange={(e) => {onChangeQuantity(val.id, e.target.value)}}
                                    onBlur = {(e) => {saveQuantity(val.id, e.target.value)}}
                                    />
                                <Plus 
                                    size={quantityBtnSize} 
                                    className={quantityBtnClass}
                                    onClick={(e) => {saveQuantity(val.id, val.count + 1)}}
                                    />
                            </div>
                            <div className='basketItem-price-container'>
                                <span className='basketItem-price'>{getSumPrice(val.price, val.count)}</span>
                                <span className='basketItem-currencyIcon'>
                                    <CurrencyIcons size={20}/>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" 
                    // onClick={() => {
                    //     basketStore.addItem('Test1');
                    // }}
                >
                    Оформить заказ
                </Button>
                <Button variant="secondary" onClick={closeFn}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal> 
    );
})

export default BasketModal;