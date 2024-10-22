import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormControl, FormGroup } from 'react-bootstrap';  // Импортируем Form
import {Context} from '../../index.js';
import styles from './Create.module.scss'
import { createBrand, createDevice, createDeviceInfo, createType, uploadFile } from '../../http/deviceAPI.js';  // Добавляем uploadFile
import { fetchBrands, fetchDevice, fetchTypes } from '../../http/deviceAPI.js';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

export const CreateDevice = observer(() => {
  const { device } = useContext(Context)
  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [text, setText] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert('Вы можете загрузить до 10 файлов.');
      return;
    }
    setSelectedFiles(files); 
  };

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevice().then(data => device.setDevices(data));
  }, [device]);

  const uploadImages = async () => {
    try {
        setLoading(true);
        const urls = await Promise.all(
            selectedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);

                const { data } = await uploadFile(formData);
                console.log('Ответ от сервера:', data);

                if (data && data.fileName) {
                    return `/uploads/${data.fileName}`; 
                } else {
                    throw new Error('Некорректный ответ от сервера');
                }
            })
        );
        setLoading(false);
        return urls;
    } catch (err) {
        console.error('Ошибка при загрузке файлов:', err);
        alert('Ошибка при загрузке файлов: ' + err.message);
        setLoading(false);
        return [];
    }
  };

  const addDevice = async () => {
    let urls = [];

    if (selectedFiles.length > 0) {
      urls = await uploadImages();  
    }

    if (urls.length === 0 && selectedFiles.length > 0) {
        alert('Ошибка загрузки изображений');
        return;
    }

    const formData = {
      title,
      text,
      price,
      imageUrl: urls, 
      brandId: device.selectedBrand?._id,
      typeId: device.selectedType?._id,
    };


    try {
        await createDevice(formData);
        handleClose();
        setTitle('');
        setPrice('');
        setText('');
        setSelectedFiles([]);
        setImageUrls([]);
    } catch (err) {
        console.error('Ошибка при создании устройства:', err);
        alert('Ошибка при создании устройства');
    }
};


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить девайс
      </Button>
      <Modal
        className={styles.modal}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить девайс</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Dropdown className={styles.dropDownList}>
              <DropdownToggle as={Button}>
                {device.selectedType ? device.selectedType.typeName : 'Выберите тип'}
              </DropdownToggle>
              <DropdownMenu>
                {device.types.map(type =>
                  <DropdownItem onClick={() => device.setSelectedType(type)} key={type._id}>
                    {type.typeName}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            <Dropdown className={styles.dropDownList}>
              <DropdownToggle>
                {device.selectedBrand ? device.selectedBrand.brandName : 'Выберите бренд'}
              </DropdownToggle>
              <DropdownMenu>
                {device.brands.map(brand =>
                  <DropdownItem onClick={() => device.setSelectedBrand(brand)} key={brand._id}>
                    {brand.brandName}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            <FormControl
              value={title}
              onChange={e => setTitle(e.target.value)} 
              className="mt-2"
              placeholder="Название устройства"
            />
            <FormControl
              value={text}
              onChange={e => setText(e.target.value)} 
              className="mt-2"
              placeholder="Описание устройства"
            />
            <FormGroup className={styles.count}>
              <FormControl
                value={price}
                onChange={e => setPrice(e.target.value)} 
                className="mt-2"
                type="number"
                min="0"
                placeholder="Стоимость устройства"
                onKeyDown={(e) => e.key === '-' && e.preventDefault()}
              />
              <span>руб.</span>
            </FormGroup>
            <FormControl
              className="mt-2 mb-2"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange} 
            />
            {selectedFiles.length > 0 && (
              <ul className="mt-3">
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Назад
          </Button>
          <Button variant="primary" onClick={addDevice} disabled={loading}>
            {loading ? 'Загрузка...' : 'Добавить'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export const CreateDeviceInfo = observer(() => {
  const { device } = useContext(Context);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [devicesFiltered, setDevicesFiltered] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevice().then(data => device.setDevices(data));
  }, [device]);

  useEffect(() => {
    if (selectedType && selectedBrand) {
      const filteredDevices = device.devices.filter(dev =>
        dev.typeId === selectedType._id && dev.brandId === selectedBrand._id
      );
      setDevicesFiltered(filteredDevices);
    } else {
      setDevicesFiltered([]);
    }
  }, [selectedType, selectedBrand, device.devices]);

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
  };

  const addDeviceInfo = async () => {
    if (!selectedDevice) {
      alert("Выберите устройство");
      return;
    }
  
    const formDataInfo = info.map(i => ({
      deviceId: selectedDevice._id, 
      title: i.title,
      description: i.description,
    }));
  
    createDeviceInfo(formDataInfo).then(() => {
      handleClose();
      setInfo([]);
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить информацию о девайсе
      </Button>
      <Modal
        className={styles.modal}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить информацию о девайсе</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Dropdown className={styles.dropDownList}>
              <DropdownToggle as={Button}>
                {selectedType ? selectedType.typeName : 'Выберите тип'}
              </DropdownToggle>
              <DropdownMenu>
                {device.types.map(type =>
                  <DropdownItem onClick={() => setSelectedType(type)} key={type._id}>
                    {type.typeName}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            <Dropdown className={styles.dropDownList}>
              <DropdownToggle as={Button}>
                {selectedBrand ? selectedBrand.brandName : 'Выберите бренд'}
              </DropdownToggle>
              <DropdownMenu>
                {device.brands.map(brand =>
                  <DropdownItem onClick={() => setSelectedBrand(brand)} key={brand._id}>
                    {brand.brandName}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            <Dropdown className={styles.dropDownList}>
              <DropdownToggle as={Button}>
                {selectedDevice ? selectedDevice.title : 'Выберите устройство'}
              </DropdownToggle>
              <DropdownMenu>
                {devicesFiltered.map(dev =>
                  <DropdownItem onClick={() => setSelectedDevice(dev)} key={dev._id}>
                    {dev.title}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            {info.map((i, index) => (
              <Row className="mt-2" key={i.number}>
                <Col md={4}>
                  <FormControl 
                    value={i.title}
                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                    placeholder="Введите название"
                    className={styles.info}
                  />
                </Col>
                <Col md={4}>
                  <FormControl 
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                    placeholder="Введите описание"
                    className={styles.info}
                  />
                </Col>
                <Col md={4}>
                  <Button 
                    variant={'outline-danger'} 
                    onClick={() => removeInfo(i.number)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            ))}

            <Button className='mt-2' onClick={() => setInfo([...info, { title: '', description: '', number: Date.now() }])}>
              Добавить параметр
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Назад
          </Button>
          <Button variant="primary" onClick={addDeviceInfo}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export const CreateBrand = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addBrand = () => {
    createBrand({brandName: value}).then(data => 
      setValue(''),
      setShow(false)
    )
  }

  return (
    <>
      <Button  onClick={handleShow}>
        Добавить бренд
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить бренд</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormControl
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={'Название бренда'}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Назад
          </Button>
          <Button variant="primary" onClick={addBrand}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const CreateType = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addType = () => {
    createType({typeName: value}).then(data => 
      setValue(''),
      setShow(false)
    )
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить тип
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить тип</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormControl
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={'Название типа'}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Назад
          </Button>
          <Button variant="primary" onClick={addType}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
