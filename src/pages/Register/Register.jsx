import React, { useContext, useState } from 'react';
import { Card, Container, Form } from 'react-bootstrap';
import style from './Register.module.scss'; 
import Button from 'react-bootstrap/button';
import { registration } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { useNavigate } from 'react-router-dom';
import { createBasket } from '../../http/basketAPI';

export const Register = observer(() => {
  const {user} = useContext(Context)
  const {basket} = useContext(Context)
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {
    try {
      const data = await registration(fullName, email, password);

      const basketData = await createBasket();
      basket.setBasket(basketData);

      user.setUser(data.token)
      user.setIsAuth(true);

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
  
      navigate('/');
    } catch (e) {
      console.log(e, 'Ошибка регистрации');
      alert('Не удалось зарегистрироваться');
    }
  };

  return (
    <Container className={style.container}> 
      <Card className={style.card}>
        <Form className={style.form}>
            <Form.Control
                className={style.input}
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Введите имя"
            />
            <Form.Control
                className={style.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Введите почту"
            />
            <Form.Control
                className={style.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Введите пароль"
            />
        </Form>
        <Button className={style.butn} onClick={register}>
          Отправить
        </Button>
      </Card>
    </Container>
  );
})
