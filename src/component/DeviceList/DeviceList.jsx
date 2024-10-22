import React from 'react';
import { DeviceItem } from '../DeviceItem/DeviceItem';
import { Row } from 'react-bootstrap';

const DeviceList = ({ devices }) => {

  return (
    <Row>
      {devices.length > 0 ? (
        devices.map(device => (
          <div key={device._id} className="mt-1">
            <DeviceItem device={device} />
          </div>
        ))
      ) : (
        <p>Нет доступных устройств для выбранных критериев.</p>
      )}
    </Row>
  );
};

export default DeviceList;
