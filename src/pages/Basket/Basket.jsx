import React, { useEffect, useState, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import styles from './Basket.module.scss'
import { BasketDevice } from '../../component/BasketDevice/BasketDevice';
import { Context } from '../../index'; 
import { getDevicesInBasket } from '../../http/basketAPI';

export const Basket = observer(() => {
  const { basket } = useContext(Context);
  const [devicesInBasketUser, setDevicesInBasketUser] = useState(null); 

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const result = await getDevicesInBasket();
        setDevicesInBasketUser(result); 
      } catch (error) {
        console.error('Ошибка при загрузке устройств:', error);
      }
    };

    fetchDevices(); 
  }, [basket]);

  if (!devicesInBasketUser) {
    return <p>Загрузка...</p>; 
  }

  return (
    <Container className={styles.list}>
      <Row>
        {devicesInBasketUser.devices.length > 0 ? (
          devicesInBasketUser.devices.map(device => (
            <div key={device._id} md={4} className={styles.deviceCard}>
              <BasketDevice device={device} />
            </div>
          ))
        ) : (
          <p>Корзина пуста</p>
        )}
      </Row>
    </Container>
  );
});
