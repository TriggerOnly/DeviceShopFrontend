import React, { useContext, useEffect, useState } from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import './Header.module.scss';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

const Navbar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate(); 

  const logout = () => {
    if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
      window.localStorage.removeItem('token');
      window.location.reload();
    }
  }

  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <Container>
        <NavLink className='link' to='/'>DNSик</NavLink>
        {user.isAuth
          ?
          <Nav className='ml-auto' style={{ color: "white" }}>
            <Button variant={'outline-light'} onClick={() => navigate(`/basket`)}>Корзина</Button>
            <Button variant={'outline-light'} onClick={() => navigate('/admin')}>Батя</Button>
            <Button variant={'outline-light'} onClick={logout}>Выйти</Button>
          </Nav>
          :
          <Nav className='ml-auto'>
            <Button variant={'outline-light'} onClick={() => navigate('/register')}>Авторизация</Button>
            <Button variant={'outline-light'} onClick={() => navigate('/login')}>Войти</Button>
          </Nav>
        }
      </Container>
    </BootstrapNavbar >
  );
});

export default Navbar;
