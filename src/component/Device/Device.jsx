import React, { useContext } from 'react';
import { Container, Image } from 'react-bootstrap';
import { Context } from '../../index';

const Device = () => {
  const {device} = useContext(Context) 

  return (
    <Container>
      <Col md={4}>
        <Image height={300} src={device.imageUrl[0]}/>
      </Col>
      <Col md={4}>
        
      </Col>
      <Col md={4}>

      </Col>
    </Container>
  );
};

export default Device;