import React from 'react';
import { ListGroup } from 'react-bootstrap';

const TypeBar = ({ types, selectedType, onSelectType }) => {
  return (
    <ListGroup>
      <ListGroup.Item
        active={!selectedType} 
        onClick={() => onSelectType(null)} 
        style={{ cursor: 'pointer' }}
      >
        Все типы
      </ListGroup.Item>

      {types && types.length > 0 ? (
        types.map(type => (
          <ListGroup.Item
            key={type._id}
            active={type._id === selectedType?._id} 
            onClick={() => onSelectType(type)} 
            style={{ cursor: 'pointer' }}
          >
            {type.typeName}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>Нет доступных типов</ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default TypeBar;
