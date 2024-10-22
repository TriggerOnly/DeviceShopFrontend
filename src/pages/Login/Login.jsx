import React, {useContext, useState} from 'react';
import { Card, Container, Form } from 'react-bootstrap';
import styles from './Login.module.scss'; 
import Button from 'react-bootstrap/button';
import { login } from '../../http/userAPI'; 
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { useNavigate } from 'react-router-dom';
import { createBasket } from '../../http/basketAPI';

export const Login = observer(() => {
  const {user} = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const sighIn = async () => {
    try {
      const data = await login(email, password)

      user.setUser(user)
      user.setIsAuth(true)
    
      await createBasket({user: user._id})
      
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      navigate('/')
    } catch (err) {
      console.log(err);
      alert('Ошибка при входе')
    }
  } 

  return (
    <Container className={styles.container}> 
      <Card className={styles.card}>
        <Form className={styles.form}>
          <Form.Control
            className={styles}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Введите почту"
          />
          <Form.Control
            className={styles.input}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </Form>
        <Button className={styles.butn} onClick={sighIn}>
          Отправить
        </Button>
      </Card>
    </Container>
  );
})
