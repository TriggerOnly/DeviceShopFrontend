import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Image, Button, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchDeviceInfo, fetchOneDevice } from '../../http/deviceAPI';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import classes from './FullDevice.module.scss';

export const FullDevice = observer(() => {
    const { device } = useContext(Context); 
    const [fulldevice, setFulldevice] = useState(null);  
    const [deviceInfo, setDeviceInfo] = useState([]); // Характеристики устройства
    const params = useParams();

    useEffect(() => {
        // Загружаем данные устройства
        fetchOneDevice(params.id)
            .then(data => {
                setFulldevice(data);
            })
            .catch(err => {
                console.error("Ошибка загрузки устройства:", err);
            });

        // Загружаем характеристики устройства
        fetchDeviceInfo(params.id)
            .then(data => {
                setDeviceInfo(data);
            })
            .catch(err => {
                console.error("Ошибка загрузки данных об устройстве:", err);
            });
        
    }, [params.id]);

    // Пока данные загружаются
    if (!fulldevice) {
        return <h2>Загрузка...</h2>;
    }

    return (
        <Container className='my-3'>
            <Row>
                <Col md={4}>
                    <Image className={classes.img} src={fulldevice.imageUrl[0]} alt={fulldevice.title}/>
                </Col>
                <Col md={4}>
                    <h2>{fulldevice.title}</h2>
                    <p>{fulldevice.text}</p>
                </Col>
                <Col md={4}>
                    <Card className={classes.buy}>
                        <h3>От: {fulldevice.price} рублей</h3>
                        <Button variant={'outline-dark'}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            {/* Отрисовка характеристик устройства */}
            <Row className={classes.params}>
                <h1>Характеристики</h1>
                {deviceInfo.map((info) => (
                    <Row key={info._id} className={classes.param}>
                        <Col md={6}><strong>{info.title}</strong></Col>
                        <Col md={6}>{info.description}</Col>
                    </Row>
                ))}
            </Row>
        </Container>
    );
});
