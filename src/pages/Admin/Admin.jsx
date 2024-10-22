import React from 'react';
import classes from './Admin.module.scss';
import { ButtonGroup, Container } from 'react-bootstrap';
import { CreateBrand, CreateDevice, CreateDeviceInfo, CreateType } from '../../component/modals/Create';
import { DeleteBrand, DeleteDevice, DeleteType } from '../../component/modals/Delete';
import { observer } from 'mobx-react-lite';

export const Admin = observer(() => {
    return (
        <Container className={classes.container}>
            <ButtonGroup className={classes['button-group']}>
                <CreateBrand />
                <CreateType />
                <CreateDevice />
                <CreateDeviceInfo/>
            </ButtonGroup>
            <ButtonGroup className={classes['button-group']}>
                <DeleteBrand />
                <DeleteType />
                <DeleteDevice />
            </ButtonGroup>
        </Container> 
    );
});
