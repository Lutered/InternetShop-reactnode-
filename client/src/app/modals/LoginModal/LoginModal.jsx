import {useEffect, useState} from 'react';

import { observer } from 'mobx-react-lite';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import globalServices from '../../../services/globalServices';

import './loginModal.css';

const LoginModal = observer(({ onHide }) => {
    const userService = globalServices.getUserService();
    const modalService = globalServices.getModalService();
    const isShowed = modalService.isModalShowed('login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const clearAll = () => {
        setEmail('');
        setPassword('');
        setErrors([]);
    }

    const closeFn = () => {
        //userService.hideLoginWnd();
        modalService.hide('login');

        onHide && onHide();
    }

    const loginFn = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) return;

        setErrors([]);
        userService.login(email, password).then(() => {
            //userService.hideLoginWnd();
            modalService.hide('login');
        }).catch((e) => {
            //userService.addError(e?.response?.data?.message);
            setErrors(errors.concat([e?.response?.data?.message]));
        });

        event.preventDefault();
        event.stopPropagation();
    };

    const onRegisterClick = (event) => {
       // navigate(REGISTER_ROUTE);
       //userService.showRegisterWnd();
       modalService.show('register');

       closeFn();
    }

    useEffect(() => {
        if(!isShowed) clearAll();
    }, [isShowed]);

    return (
        <Modal className='loginModal' show={isShowed} onHide={closeFn}>
            <Modal.Header closeButton>
                <Modal.Title>Войти</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form 
                    onSubmit={loginFn}
                >
                    <Form.Group controlId="loginForm.loginEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className='mt-2' controlId="loginForm.loginPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </Form.Group>

                    {errors.length > 0 ? 
                        <div className='mt-2 '>
                            {errors.map((err, index) => 
                                <p className='loginModal-errorText' key={index}>{err}</p>
                            )}
                        </div> 
                        :
                        null
                    }                   
                    <Form.Group className='mt-3 d-flex flex-column' controlId="loginForm.buttonSection">
                        <Button variant="success" className='w-100' type='submit'>Войти</Button>
                        <div className='loginModal-divider my-2'>Или</div>
                        <Button className='loginModal-registerBtn w-100 mt-1' onClick={() => { onRegisterClick(); }}>Зарегистрироваться</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default LoginModal;