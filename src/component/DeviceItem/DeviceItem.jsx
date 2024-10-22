import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './DeviceItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { addDeviceToBasket } from '../../http/basketAPI';
import { Context } from '../../index';

export const DeviceItem = observer(({ device }) => {
    const navigate = useNavigate();

    const addDeviceBasket = async () => {
        try {
            await addDeviceToBasket({
                device: device._id,
            });
        } catch (error) {
            console.error('Ошибка при добавлении устройства в корзину:', error);
        }
    };

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        return numericPrice.toLocaleString('ru-RU');
    };

    return (
        <Card className={styles.deviceCard}>
            <div className={styles.cardContent}>
                <Card.Img
                    variant="left"
                    src={`http://localhost:4000${device.imageUrl[0]}`}
                    className={styles.deviceImage} 
                />
                <Card.Body className={styles.cardBody}>
                    <div className={styles.textContent}>
                        <Card.Title
                            className={styles.title}
                            onClick={() => navigate(`/device/` + device._id)}
                        >
                            {device.title}
                        </Card.Title>
                        <Card.Text>{device.text}</Card.Text>
                        <Card.Text className={styles.price}>
                            От: {formatPrice(device.price)} ₽
                        </Card.Text>
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button variant="primary" className={styles.button}>
                            В избранное
                        </Button>
                        <Button
                            onClick={addDeviceBasket}
                            variant="primary"
                            className={styles.button}
                        >
                            В корзину
                        </Button>
                    </div>
                </Card.Body>
            </div>
        </Card>
    );
});
