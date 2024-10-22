import React from 'react';
import { ListGroup } from 'react-bootstrap';

const BrandBar = ({ brands, selectedBrand, onSelectBrand }) => {
  return (
    <ListGroup>
      <ListGroup.Item
        active={!selectedBrand} 
        onClick={() => onSelectBrand(null)} 
        style={{ cursor: 'pointer' }}
      >
        Все типы
      </ListGroup.Item>

        {brands && brands.length > 0 ? (
          brands.map(brand => (
            <ListGroup.Item
              key={brand._id}
              active={brand._id === selectedBrand?._id} 
              onClick={() => onSelectBrand(brand)} 
              style={{ cursor: 'pointer' }}
            >
              {brand.brandName}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Нет доступных брендов</ListGroup.Item>
        )}
    </ListGroup>
  );
};

export default BrandBar;
