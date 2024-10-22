import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { observer } from 'mobx-react-lite';
import BrandBar from '../../component/BrandBar/BrandBar';
import TypeBar from '../../component/TypeBar/TypeBar';
import DeviceList from '../../component/DeviceList/DeviceList';
import { fetchTypes, fetchBrands, fetchDevice } from '../../http/deviceAPI';
import { Context } from '../../index';
import styles from './Shop.module.scss';

export const Shop = observer(() => {
  const { device } = useContext(Context);
  const [selectedBrand, setSelectedBrand] = useState(null); 
  const [selectedType, setSelectedType] = useState(null);   

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevice().then(data => device.setDevices(data)); 
  }, [device]);

  const filteredDevices = device.devices.filter(device => {
    const matchesBrand = selectedBrand ? device.brandId === selectedBrand._id : true;
    const matchesType = selectedType ? device.typeId === selectedType._id : true;
    return matchesBrand && matchesType;
  });

  return (
    <Container>
      <Row className="mt-2">
        <div className={styles.sidebar}>
          <Col>
            <TypeBar 
              types={device.types}
              selectedType={selectedType} 
              onSelectType={setSelectedType}
            />  
          </Col>
        </div>
        <div className={styles.centerContent}>
          {filteredDevices && filteredDevices.length > 0 ? (
            <DeviceList devices={filteredDevices} />
          ) : (
            <div>No devices available</div>
          )}
        </div>
        <div className={styles.brandBar}>
          <Col>
            <BrandBar 
              brands={device.brands}
              selectedBrand={selectedBrand} 
              onSelectBrand={setSelectedBrand}
            />  
          </Col>
        </div>
      </Row>
    </Container>
  );
});

export default Shop;
