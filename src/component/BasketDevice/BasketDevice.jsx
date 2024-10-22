import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { addDeviceToBasket, deleteDeviceFromBasket, getDevicesInBasket } from '../../http/basketAPI';
import { Card, Button } from 'react-bootstrap';
import styles from '../../pages/Basket/Basket.module.scss';

export const BasketDevice = observer(({ device }) => {
    const [devicesCount, setDevicesCount] = useState(null);

    useEffect(() => {
        const fetchDevicesCount = async () => {
            try {
                const devicesIn = await getDevicesInBasket();
                const foundDevice = devicesIn.devicesInBasket.find(item => item.device === device._id);
                if (foundDevice) {
                    setDevicesCount(foundDevice.count); 
                }
            } catch (error) {
                console.error('Ошибка при загрузке устройств в корзине:', error);
            }
        };

        fetchDevicesCount();
    }, [device._id]);

    const addDeviceBasket = async () => {
        try {
            await addDeviceToBasket(device._id);
            setDevicesCount(prevCount => prevCount + 1);  
        } catch (error) {
            console.error('Ошибка при добавлении устройства в корзину:', error);
        }
    };

    const deleteDeviceBasket = async () => {
        try {
            await deleteDeviceFromBasket(device._id);
            setDevicesCount(prevCount => prevCount > 1 ? prevCount - 1 : prevCount);  
        } catch (error) {
            console.error('Ошибка при удалении устройства из корзины:', error);
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
                        <div className={styles.counter}>
                            <Button
                                variant="outline-secondary"
                                onClick={deleteDeviceBasket}
                                disabled={devicesCount <= 1}
                            >
                                -
                            </Button>
                            <span className={styles.count}>{devicesCount !== null ? devicesCount : '...'}</span> {/* Отображаем счётчик */}
                            <Button
                                variant="outline-secondary"
                                onClick={addDeviceBasket}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </div>
        </Card>
    );
});
