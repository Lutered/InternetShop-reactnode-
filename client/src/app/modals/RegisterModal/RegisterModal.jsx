import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import globalServices from '../../../services/globalServices';

import './registerModal.css';

const RegisterModal = observer(({ onHide }) => {
    const userService = globalServices.getUserService();
    const modalService = globalServices.getModalService();
    const isShowed = modalService.isModalShowed('register');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const clearAll = () => {
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };

    const closeFn = () => {
        //userService.hideRegisterWnd();
        modalService.hide('register');

        onHide && onHide();
    }

    const registerFn = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) return;

        setErrors([]);
        userService.register(name, email, password).then(() => {
            //userService.hideRegisterWnd();
            modalService.hide('register');
        }).catch((e) => {
            //userService.addError(e?.response?.data?.message);
            setErrors(errors.concat([e?.response?.data?.message]));
        });

        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        if(!isShowed) clearAll();
    }, [isShowed]);

    return (
        <Modal className='registerModal' size="lg" show={isShowed} onHide={closeFn}>
            <Modal.Header closeButton>
                <Modal.Title>Зарегистрироваться</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form 
                    onSubmit={registerFn}
                >
                    <Form.Group className='registerModal-inputEl' controlId="registerForm.firstName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control 
                            required
                            type="text" 
                            placeholder="Имя" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </Form.Group>
                     <Form.Group className='registerModal-inputEl' controlId="registerForm.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className='registerModal-inputEl' controlId="registerForm.password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className='registerModal-inputEl' controlId="registerForm.confirmPassword">
                        <Form.Label>Подтвердить пароль</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            placeholder="Confirm password" 
                            value={confirmPassword} 
                            isInvalid={
                                confirmPassword !== password
                            }
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
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
                        <Button variant="success" className='w-100' type='submit'>Зарегистрироваться</Button>                        
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default RegisterModal;